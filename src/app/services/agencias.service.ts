import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { of } from "rxjs";
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { AuthService } from './auth.service';
import { IAgencia } from '../interfaces/agencia.interface';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
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
