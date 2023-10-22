import { ApplicationRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/role.enum';

@Directive({
  selector: '[appRoleDirective]'
})
export class RoleUserDirective implements OnInit{


  private currentUserRoles: Role[]=[];
  private rolesAllowed: Role[]=[];

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private authService:AuthService ,
    ) {
      this.currentUserRoles = this.authService.roles;
    }

  ngOnInit(): void {
  //   this.authService.userLoggedIn$.subscribe( res=>{
  //     this.currentUserRoles = res.data?.role ?? [Role.ADMIN];
  //    this.appRef.tick();

  //
  //  });
  }


  @Input()
  set appRoleDirective(val:Role[]){
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.rolesAllowed = val;

      this.updateView();
  }

  updateView() {
    this.viewContainer.clear();
    if (this.checkPermissions()){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }

  }

  checkPermissions():boolean {
    for (const rol of this.currentUserRoles) {
      if (this.rolesAllowed.includes(rol)){
        return true;
      }
    }
    return false
  }

}
