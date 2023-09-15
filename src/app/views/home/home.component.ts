import { Component, OnInit } from '@angular/core';

import { MENU_OPTIONS } from 'src/base/config/constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {}

  OPTIONS_SIDEBAR = MENU_OPTIONS;

  isSidebarClose!: boolean | null;
  isMdScreen = false;
  ngOnInit(): void {

  }


}
