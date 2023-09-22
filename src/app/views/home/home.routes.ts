import { RouterModule, Routes } from '@angular/router';

import { CartaPreferencialComponent } from '../carta-preferencial/carta-preferencial.component';
import { HomeComponent } from './home.component';
import { HomePageComponent } from '../admin/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';
import { PlazoFijoComponent } from '../plazo-fijo/plazo-fijo.component';
import { ProcessRisksComponent } from '../risks/process-risks/process-risks.component';
import { ReportCreditsComponent } from '../credits/report-credits/report-credits.component';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuariosComponent } from '../admin/usuarios/usuarios.component';
import { SeguridadComponent } from '../admin/seguridad/seguridad.component';

const homeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'seguridad',
        component: SeguridadComponent,
      },
      {
        path: 'carta-preferencial',
        component: CartaPreferencialComponent,
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
        path: '**',
        component: PageNotFoundComponentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
