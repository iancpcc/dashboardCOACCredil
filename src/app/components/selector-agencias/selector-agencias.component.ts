import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AppStateEntity } from 'src/data/entities/app-state.entity';
import { AuthService } from 'src/app/services/auth.service';
import { DataState } from '../../../data/entities/app-state.entity';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-selector-agencias',
  templateUrl: './selector-agencias.component.html',
  styleUrls: ['./selector-agencias.component.css'],
})
export class SelectorAgenciasComponent implements OnInit {
  @Output() agenciasOutput = new EventEmitter<{}>();
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;
  agencias: IAgencia[] = [];

  readonly DataState = DataState;

  constructor(private agenciaService: AgenciasService) {}

  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(): void {
    this.agencias$ = this.obtenerAgencias$();
  }

  obtenerAgencias$(): Observable<AppStateEntity<IAgencia[]>> {
    return this.agenciaService.getAgenciesByUserLogged$().pipe(
      map((response) => {
        if (response.success) {
          if (response.data && response.data.length > 1) {
            let consolidado = response.data.map((ag) => ag.id);
            response.data.push({
              nombre: 'TODOS',
              id: consolidado.toString(),
            });
          }
          this.agencias = [...response.data!];
          return { state: DataState.LOADED, data: response.data };
        }
        return { state: DataState.LOADED, data: [] };
      }),
      startWith({ state: DataState.LOADING }),
      catchError((error) => {
        //
        return of({ state: DataState.ERROR, error });
      })
    );
  }

  agenciaSeleccionada(event: any) {
    let codigo = event.target.value;
    let agencia = this.agencias.find((ag) => ag.id == codigo);
    this.agenciasOutput.emit({
      codigo: codigo,
      nombre: agencia?.nombre ?? 'NINGUNA',
    });
  }
}
