import { AuthService } from './auth.service';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { HttpHeaders } from '@angular/common/http';
import { IAgencia } from '../interfaces/agencia.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgenciasService {
  private readonly base_url = `${environment.url_services}/Agency`;
  private readonly headers = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    withCredentials: true,
  };

  constructor( private genericService:GenericCRUDService, private authService:AuthService) { }

  getAgenciesByUserLogged$ = ()=> this.genericService.getApiData< IAgencia[]>(`${this.base_url}/agenciesByUser?userId=${this.authService.userLogged}`) ;

}
