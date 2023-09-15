import { RouterModule, Routes } from '@angular/router';

import { CartaPreferencialComponent } from '../carta-preferencial/carta-preferencial.component';
import { HomeComponent } from './home.component';
import { HomePageComponent } from '../admin/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';
import { ProcessRisksComponent } from '../risks/process-risks/process-risks.component';
import { ReportCreditsComponent } from '../credits/report-credits/report-credits.component';
import { Role } from 'src/app/interfaces/role.enum';

const homeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'main',
        component: HomePageComponent,
      },
      {
        path: 'riesgos/procesos',
        component: ProcessRisksComponent,
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
      // { path: '', redirectTo: '/main', pathMatch: 'full' },
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
