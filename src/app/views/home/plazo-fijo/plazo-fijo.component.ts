import {
  AppStateEntity,
  DataState,
} from 'src/2.data/entities/app-state.entity';
import { Component, Type, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { DataTableDirective } from 'angular-datatables';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { RPlazoFijo } from 'src/app/interfaces/IReportes/plazo-fijo.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-plazo-fijo',
  templateUrl: './plazo-fijo.component.html',
  styleUrls: ['./plazo-fijo.component.css'],
})
export class PlazoFijoComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  // consultaCuotasVencidas: CuotasVencidas[] = []
  paramsToAPI: any = {
    codigoAgencias: 0,
    codigoAsesores: 0,
    diaFin: 7,
    diaInicio: 0,
  };
  reportState$: AppStateEntity<RPlazoFijo[]> = {};
  isFirstCallAjax: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private agenciaService: AgenciasService,
    private usuarioSerice: UsuarioService,
    private reportSrv: ReportService
  ) {}

  ngOnInit(): void {
    this.agencias$ = this.obtenerAgencias$();
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },
      pageLength: 10,
      processing: true,
      // serverSide: true,
      responsive: true,
      ajax: ({}, callback: any) => {
        this.reportSrv
          .obtenerPlazoFijoPorAsesor$(this.paramsToAPI)
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => of({ state: DataState.ERROR, error }))
          )
          .subscribe(async (resp: AppStateEntity<RPlazoFijo[]>) => {
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
          title: 'Codigo',
          data: 'codigo',
        },
        {
          title: 'Cliente',
          data: 'cliente',
        },
        {
          title: 'Dirección',
          data: 'direccion',
        },
        {
          title: 'Teléfono',
          data: 'telefonos',
        },

        {
          title: 'Monto',
          data: 'monto',
        },
        {
          title: 'Plazo',
          data: 'plazo',
        },
        {
          title: 'Fecha Creación',
          data: 'fechacreacion',
        },
        {
          title: 'Fecha Vencimiento',
          data: 'fechavencimiento',
        },
        {
          title: 'Vence en(Días)',
          data: 'diasfaltantes',
        },
        {
          title: 'Asesor',
          data: 'nombre',
        },
        {
          title: 'Agencia',
          data: 'agencia',
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
        // console.log(Error,error)
        return of({ state: DataState.ERROR, error });
      })
    );
  }

  async onSubmit() {
    this.isFirstCallAjax = false;
    // debugger
    await this.reload();
  }

  obtenerUsuariosPorAgencia(event: any): void {
    let agencia = event.target.value;
    const rolesId = `${
      (Role.ASESOR_CAPTACIONES, Role.GESTOR_CREDITO, Role.ASESOR_NEGOCIOS)
    }`;
    // this.paramsToAPI.codigoAsesores = null;
    this.usuarios$ = this.usuarioSerice
      .getUsersByAgencies$({
        agencia,
        rolesId,
      })
      .pipe(
        map((response) => {
          console.log('Respuesta', response);
          response.data?.push({
            nombre: 'TODOS',
            usuario: null,
          });
          return { state: DataState.LOADED, data: response.data };
        }),
        catchError((err) => {
          return of({ state: DataState.ERROR, error: err });
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
    return (
      this.paramsToAPI.codigoAsesores != 0 &&
      this.paramsToAPI.codigoAgencias != 0
    );
  }
}
