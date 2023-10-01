import { DataState } from 'src/2.data/entities/app-state.entity';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { IUsuarioCliente } from '../interfaces/usuario-cliente.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly base_url = `${environment.url_services}/Client`;
  readonly DataState = DataState;

  constructor(private genericService: GenericCRUDService) {}
  getClient$ = (socio: number | string) =>
    this.genericService.getApiData<IUsuarioCliente>(
      `${this.base_url}/findClient?id=${socio}`
    );
}
