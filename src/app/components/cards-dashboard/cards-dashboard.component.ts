import { Component, Input } from '@angular/core';

import { ITotalUsuariosPanel } from 'src/app/interfaces/IReportes/total-usuarios.interface';

@Component({
  selector: 'app-cards-dashboard',
  templateUrl: './cards-dashboard.component.html',
  styleUrls: ['./cards-dashboard.component.css']
})
export class CardsDashboardComponent {
  @Input() totalUsuarios:ITotalUsuariosPanel | undefined
  @Input() totalUsuariosBanca:number = 0


}
