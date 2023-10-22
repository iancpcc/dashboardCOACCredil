import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotasVencidasAgenciaComponent } from './cuotas-vencidas-agencia.component';

describe('CuotasVencidasAgenciaComponent', () => {
  let component: CuotasVencidasAgenciaComponent;
  let fixture: ComponentFixture<CuotasVencidasAgenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotasVencidasAgenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuotasVencidasAgenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
