import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { MENU_OPTIONS } from 'src/base/config/rutas-app';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  OPTIONS_SIDEBAR = MENU_OPTIONS;
  isSubmenuOpen: boolean = false;
  isSidebarClose!: boolean ;
  currentMenu: number = -1;
  @Output() sidebarClose = new EventEmitter<boolean>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver

  ) {}


  ngOnInit(): void {
    const rutaActual = this.router.url;
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      this.isSidebarClose = result.matches;
      this.sidebarClose.emit(this.isSidebarClose)
    });


    this.OPTIONS_SIDEBAR.forEach((element, index) => {
      let existRoute = element.submenu.some(name=> name.route === rutaActual)
       if (existRoute){
        this.currentMenu = index;
        this.isSubmenuOpen = true;
        if (this.isSidebarClose){
          this.isSubmenuOpen = false;
        }
      }

  })


  }

  toggleSidebar(event: any) {
    this.isSidebarClose = !this.isSidebarClose;
    this.isSubmenuOpen = false;
    this.sidebarClose.emit(this.isSidebarClose);

    const rutaActual = this.router.url;
    this.OPTIONS_SIDEBAR.forEach((element, index) => {
      if (element.submenu.some(name=> name.route ===rutaActual)){
        this.currentMenu = index;
        this.isSubmenuOpen = false;
      }

    })
  }

  toggleSubMenu(event: any, index: number) {
    if (index !== this.currentMenu) {
      this.isSubmenuOpen = false;
    }
    if(this.isSidebarClose){
      this.isSidebarClose= !this.isSidebarClose
      this.sidebarClose.emit(this.isSidebarClose);
    }
    this.currentMenu = index;
    this.isSubmenuOpen = !this.isSubmenuOpen;

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
