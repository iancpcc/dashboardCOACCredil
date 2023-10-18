import { RouterModule, Routes } from '@angular/router';

import { CartaPreferencialComponent } from './carta-preferencial/carta-preferencial.component';
import { CuotasVencidasComponent } from './cuotas-vencidas/cuotas-vencidas.component';
import { DashboardPageComponent } from './panel-principal/dashboard-page.component';
import { HomeComponent } from './home.component';
import { MENU_OPTIONS } from 'src/base/config/rutas-app';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';
import { PlazoFijoComponent } from './proximos-vencimientos/plazo-fijo.component';
import { Role } from 'src/app/interfaces/role.enum';
import { SeguridadComponent } from '../admin/seguridad/seguridad.component';
import { SituacionCrediticiaComponent } from './situacion-crediticia/situacion-crediticia.component';
import { UsuariosComponent } from '../admin/usuarios/usuarios.component';

const homeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          roles: [
            Role.ADMIN,
            Role.ADMINISTRATIVO,
            Role.JEFE_NEGOCIOS,
            Role.ASESOR_CAPTACIONES,
          ],
        },
      },
      {
        path: 'usuarios-adm',
        component: SeguridadComponent,
        data: {
          roles: [
            Role.ADMIN,
            Role.ADMINISTRATIVO,
            Role.JEFE_NEGOCIOS,
            Role.ASESOR_CAPTACIONES,
          ],
        },
      },
      //MODULO GERENCIA
      {
        path: MENU_OPTIONS[1].submenu[0].route.replace('/',''),
        component: CuotasVencidasComponent,
        data: {
          roles: MENU_OPTIONS[1].roles
        },

      },
      {
        path: MENU_OPTIONS[1].submenu[1].route.replace('/',''),
        component: CartaPreferencialComponent,
        data: {
          roles: MENU_OPTIONS[1].roles
        },
      },
      {
        path: MENU_OPTIONS[1].submenu[2].route.replace('/',''),
        component: SituacionCrediticiaComponent,
        data: {
          roles: MENU_OPTIONS[1].roles
        },
      },
      //DPFs
      {
        path:  MENU_OPTIONS[2].submenu[0].route.replace('/',''),
        component: PlazoFijoComponent,
        data: {
          roles: MENU_OPTIONS[2].roles
        },
      },
      {
        path: '',
        component: DashboardPageComponent,
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
