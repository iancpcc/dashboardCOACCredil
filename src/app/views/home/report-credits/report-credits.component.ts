import {
  AppStateEntity,
  DataState,
} from 'src/2.data/entities/app-state.entity';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith, tap } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { CuotasVencidas } from 'src/app/interfaces/IReportes/cuotas-vencidas.interface';
import { DataTableDirective } from 'angular-datatables';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-report-credits',
  templateUrl: './report-credits.component.html',
  styleUrls: ['./report-credits.component.css'],
})
export class ReportCreditsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  // consultaCuotasVencidas: CuotasVencidas[] = []
  paramsToAPI: any = {
    fechaCorte: this.utils.obtenerFechaActual(),
    asesorId: 0,
    agencia: 0,
  };
  reportState$: AppStateEntity<CuotasVencidas[]> = {};
  isFirstCallAjax: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private agenciaService: AgenciasService,
    private usuarioSerice: UsuarioService,
    private reportSrv: ReportService,
    private utils: HelpersService
  ) {}

  ngOnInit(): void {
    this.agencias$ = this.obtenerAgencias$();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },
      // serverSide: true,
      responsive: true,
      ajax: ({}, callback: any) => {
        this.reportSrv
          .getCuotasVencidasByAsesor$(this.paramsToAPI)
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {
              return of({ state: DataState.ERROR, error, data: [] });
            })
          )
          .subscribe(async (resp: AppStateEntity<CuotasVencidas[]>) => {
            this.reportState$ = resp;
            callback({
              recordsTotal: resp.data?.length,
              recordsFiltered: resp.data?.length,
              data: resp.data,
            });
          });

        // })
      },
      columns: [
        {
          title: 'Cliente',
          data: 'nombre',
        },
        {
          title: 'Dirección',
          data: 'direccion',
        },
        {
          title: 'Coordenadas',
          data: 'coordenadas',
        },
        {
          title: 'Teléfono',
          data: 'telefono',
        },
        {
          title: 'Saldo',
          data: 'saldo',
        },
        {
          title: 'SaldoVencido',
          data: 'saldosvencido',
        },
        {
          title: 'Diasmoraactual',
          data: 'diasmoraactual',
        },
        {
          title: 'Garantes',
          data: 'garantes',
        },
      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'pdf'],
    };
  }

  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload();
  }

  obtenerAgencias$(): Observable<AppStateEntity<IAgencia[]>> {
    return this.agenciaService.getAgenciesByUserLogged$().pipe(
      map((response) => {
        if (response.data && response.data.length > 1) {
          let consolidado = response.data.map((ag) => ag.id);
          response.data?.push({
            nombre: 'TODOS',
            id: consolidado.toString(),
          });
        }
        return { state: DataState.LOADED, data: response.data };
      }),
      startWith({ state: DataState.LOADING }),
      catchError((error) => {
        //
        return of({ state: DataState.ERROR, error });
      })
    );
  }

  async onSubmit() {
    this.isFirstCallAjax = false;
    await this.reload();
  }

  obtenerUsuariosPorAgencia(event:any): void {
    let agencia = event.target.value
    const rolesId = `${(Role.ASESOR_CAPTACIONES, Role.GESTOR_CREDITO)}`;
    this.usuarios$ = this.usuarioSerice.getUsersByAgencies$({
      agencia,
      rolesId,
    })
    .pipe(
      map((response) => {
        response.data?.push({
          nombre: 'TODOS',
          usuario: null,
        });
        return { state: DataState.LOADED, data: response.data };
      })
    );
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(null);
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  get isReadyAllParameters() {
    return this.paramsToAPI.asesorId != 0 && this.paramsToAPI.agencia != 0;
  }
}
