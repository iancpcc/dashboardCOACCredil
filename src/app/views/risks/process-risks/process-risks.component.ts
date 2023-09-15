
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Observable, catchError, forkJoin, map, of, startWith } from 'rxjs';
import { AppStateEntity, DataState } from 'src/2.data/entities/app-state.entity';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { AuthService } from 'src/app/services/auth.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
@Component({
  selector: 'app-process-risks',
  templateUrl: './process-risks.component.html',
  styleUrls: ['./process-risks.component.css']
})
export class ProcessRisksComponent {

  resultApi!: AppStateEntity<any>;
  controlDate = new FormControl('');
  controlMultiselect = new FormControl('');
  readonly DataState = DataState;
  endPointsScripts!: Observable<ResponseEntity<any>>[];


  constructor(private riesgos: RiesgosService,
    private _authService: AuthService, private _router: Router
    
    ) { }

  selectedItems: ListItem[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    selectAllText: 'Seleccionar Todo',
    unSelectAllText: 'Deseleccionar Todo',
    searchPlaceholderText: "Buscar",
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  ngOnInit() {



  }

  onItemSelect(item: ListItem) {
    if (this.selectedItems.some(it => it.id == item.id)) return
    this.selectedItems.push(item)
  }

  onSelectAll(items: ListItem[]) {
    this.selectedItems = items
  }

  validateFormControls() {

    if (this.selectedItems.length === 0) {
      this.controlMultiselect.setErrors({ items: 'Seleccione almenos 1 item!' });
      return false;
    }

    if (this.controlDate.value === '') {
      this.controlDate.setErrors({ fecha: 'Escoja una fecha correcta' });
      return false;
    }

    return true;
  }


  onSubmit(): void {

    if (!this.validateFormControls()) return

    const endPointList = this.generateUrlsToForkJoin(this.selectedItems, this.controlDate.value!);
    console.log('Endpoints', endPointList);

    forkJoin(endPointList)
      .pipe(
        map((res) => {
          return { state: DataState.LOADED, data: res };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {
          console.log('Entro al catch');
          return of({ state: DataState.ERROR, error: error });
        })
      ).subscribe((value) => {
        this.resultApi = value
      })
  }

  generateUrlsToForkJoin(namesScripts: ListItem[], date: string): Observable<AppStateEntity<ResponseEntity<any>>>[] {

    const urlApis: Observable<AppStateEntity<ResponseEntity<any>>>[] = [];
    for (const sp of namesScripts) {
      const urlApi = this.riesgos.runSP$(sp.text, date)
        .
        pipe(
          map((res) => { return { state: DataState.LOADED, data: res } }),
          catchError(error => of({ state: DataState.ERROR, error: error.message }))
        );
      urlApis.push(urlApi)
    }
    return urlApis;
  }
  logout() {
    // this._authService.();
    this._router.navigateByUrl("/login")
  }
}

