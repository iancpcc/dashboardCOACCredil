import { RouterModule, Routes } from '@angular/router';

import { CartaPreferencialComponent } from './carta-preferencial/carta-preferencial.component';
import { HomeComponent } from './home.component';
import { HomePageComponent } from '../admin/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';
import { PlazoFijoComponent } from './plazo-fijo/plazo-fijo.component';
import { ReportCreditsComponent } from './report-credits/report-credits.component';
import { Role } from 'src/app/interfaces/role.enum';
import { SeguridadComponent } from '../admin/seguridad/seguridad.component';
import { UsuariosComponent } from '../admin/usuarios/usuarios.component';

const homeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
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
      {
        path: 'carta-preferencial',
        component: CartaPreferencialComponent,
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
        path: 'cuotas-vencidas',
        component: ReportCreditsComponent,
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
        path: 'vencimientos',
        component: PlazoFijoComponent,
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
        path: '',
        component: HomePageComponent,
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
