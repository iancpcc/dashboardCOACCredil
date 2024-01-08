import { CanActivate, RouterModule, Routes } from '@angular/router';

import { AuthorizationPagesGuard } from 'src/app/guards/authorization-pages.guard';
import { CartaPreferencialComponent } from './carta-preferencial/carta-preferencial.component';
import { CreditosAdjudicadosComponent } from './creditos-adjudicados/creditos-adjudicados.component';
import { CreditosAprobadosComponent } from './creditos-aprobados/creditos-aprobados.component';
import { CumpleaniosClientesComponent } from './cumpleanios-clientes/cumpleanios-clientes.component';
import { CuotasVencidasAgenciaComponent } from './cuotas-vencidas-agencia/cuotas-vencidas-agencia.component';
import { CuotasVencidasComponent } from './cuotas-vencidas/cuotas-vencidas.component';
import { DashboardPageComponent } from './panel-principal/dashboard-page.component';
import { GeoreferenciacionComponent } from './georeferenciacion/georeferenciacion.component';
import { HomeComponent } from './home.component';
import { MENU_OPTIONS } from 'src/base/config/rutas-app';
import { MensajesTextoComponent } from '../mensajes-texto/mensajes-texto.component';
import { NgModule } from '@angular/core';
import { PageNoAuthorizedComponent } from './page-no-authorized/page-no-authorized.component';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';
import { PlazoFijoComponent } from './vencimientos/proximos-vencimientos';
import { Role } from 'src/app/interfaces/role.enum';
import { SatisfaccionClienteComponent } from './satisfaccion-cliente/satisfaccion-cliente.component';
import { SituacionCrediticiaComponent } from './situacion-crediticia/situacion-crediticia.component';
import { UsuariosAdmComponent } from '../admin/usuarios/usuarios-adm.component';

const homeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      //Dashboard
      {
        path: '',
        component: DashboardPageComponent,
      },
      {
        path: 'home',
        component: DashboardPageComponent,
      },
      //Modulo de Adminitracion
      {
        path: MENU_OPTIONS[0].submenu[0].route.replace("/",""),
        component: UsuariosAdmComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[0].roles
        },
      },

      //MODULO GERENCIA 1
      {
        path: MENU_OPTIONS[1].submenu[0].route.replace('/',''),
        component: GeoreferenciacionComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[1].roles
        },
      },
      {
        path: MENU_OPTIONS[1].submenu[1].route.replace('/',''),
        component: SatisfaccionClienteComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[1].roles
        },
      },

      // {
      //   path: MENU_OPTIONS[1].submenu[1].route.replace('/',''),
      //   component: GeoreferenciacionComponent,
      // canActivate:[AuthorizationPagesGuard],//
      // data: {
      //     roles: MENU_OPTIONS[1].roles
      //   },
      // },

      //Modulo DPFs 2
      {
        path:  MENU_OPTIONS[2].submenu[0].route.replace('/',''),
        component: PlazoFijoComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[2].roles
        },
      },

      //Modulo Socios 3
      {

        path:  MENU_OPTIONS[3].submenu[0].route.replace('/',''),
        component: CumpleaniosClientesComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[3].roles
        },
      },
      //Modulo Creditos 3
      {
        path:  MENU_OPTIONS[4].submenu[0].route.replace('/',''),
        component: CuotasVencidasComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[4].roles
        },
      },
      {
        path: MENU_OPTIONS[4].submenu[1].route.replace('/',''),
        component: CartaPreferencialComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[4].roles
        },
      },
      // Otros 5
      {
        path: MENU_OPTIONS[5].submenu[0].route.replace('/',''),//SITUACION CREDITICIA
        component: SituacionCrediticiaComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[5].roles
        },
      },
      {
        path: MENU_OPTIONS[5].submenu[1].route.replace('/',''), //ENVIO DE MENSAJES
        component: MensajesTextoComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[5].roles
        },
      },
      {
        path: 'accesso-no-autorizado', //ENVIO DE MENSAJES
        component: PageNoAuthorizedComponent,
      },
      // Administrativos 6
      {
        path: MENU_OPTIONS[6].submenu[0].route.replace('/',''),//SITUACION CREDITICIA
        component: CreditosAdjudicadosComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[6].roles
        },
      },
      {
        path: MENU_OPTIONS[6].submenu[1].route.replace('/',''), //ENVIO DE MENSAJES
        component: CreditosAprobadosComponent,
        canActivate:[AuthorizationPagesGuard],
        data: {
          roles: MENU_OPTIONS[6].roles
        },
      },
      {
        path: 'accesso-no-autorizado', //ENVIO DE MENSAJES
        component: PageNoAuthorizedComponent,
      },
    ],

  },
  {
    path: '**',
    component: PageNotFoundComponentComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
