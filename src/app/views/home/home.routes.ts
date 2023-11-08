import { RouterModule, Routes } from '@angular/router';

import { CartaPreferencialComponent } from './carta-preferencial/carta-preferencial.component';
import { CumpleaniosClientesComponent } from './cumpleanios-clientes/cumpleanios-clientes.component';
import { CuotasVencidasAgenciaComponent } from './cuotas-vencidas-agencia/cuotas-vencidas-agencia.component';
import { CuotasVencidasComponent } from './cuotas-vencidas/cuotas-vencidas.component';
import { DashboardPageComponent } from './panel-principal/dashboard-page.component';
import { GeoreferenciacionComponent } from './georeferenciacion/georeferenciacion.component';
import { HomeComponent } from './home.component';
import { MENU_OPTIONS } from 'src/base/config/rutas-app';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';
import { PlazoFijoComponent } from './proximos-vencimientos/plazo-fijo.component';
import { Role } from 'src/app/interfaces/role.enum';
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
        data: {
          roles: [
            Role.ADMIN,
            Role.ADMINISTRATIVO,
            Role.JEFE_NEGOCIOS,
            Role.ASESOR_CAPTACIONES,
          ],
        },
      },
      //Modulo de Adminitracion
      {
        path: MENU_OPTIONS[0].submenu[0].route.replace("/",""),
        component: UsuariosAdmComponent,
        data: {
          roles: MENU_OPTIONS[0].roles
        },
      },

      //MODULO GERENCIA 1
      {
        path: MENU_OPTIONS[1].submenu[0].route.replace('/',''),
        component: CartaPreferencialComponent,
        data: {
          roles: MENU_OPTIONS[1].roles
        },
      },

      // {
      //   path: MENU_OPTIONS[1].submenu[1].route.replace('/',''),
      //   component: GeoreferenciacionComponent,
      //   data: {
      //     roles: MENU_OPTIONS[1].roles
      //   },
      // },

      //Modulo DPFs 2
      {
        path:  MENU_OPTIONS[2].submenu[0].route.replace('/',''),
        component: PlazoFijoComponent,
        data: {
          roles: MENU_OPTIONS[2].roles
        },
      },

      //Modulo Socios 3
      {

        path:  MENU_OPTIONS[3].submenu[0].route.replace('/',''),
        component: CumpleaniosClientesComponent,
        data: {
          roles: MENU_OPTIONS[3].roles
        },
      },

      //Modulo Creditos 3

      {
        path:  MENU_OPTIONS[4].submenu[0].route.replace('/',''),
        component: CuotasVencidasComponent,
        data: {
          roles: MENU_OPTIONS[4].roles
        },
      },
      {
        path: MENU_OPTIONS[4].submenu[1].route.replace('/',''),
        component: CuotasVencidasAgenciaComponent,
        data: {
          roles: MENU_OPTIONS[4].roles
        },
      },
      {
        path: MENU_OPTIONS[5].submenu[0].route.replace('/',''),
        component: SituacionCrediticiaComponent,
        data: {
          roles: MENU_OPTIONS[5].roles
        },
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
