import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonGenerarReporteComponent } from './boton-generar-reporte.component';

describe('BotonGenerarReporteComponent', () => {
  let component: BotonGenerarReporteComponent;
  let fixture: ComponentFixture<BotonGenerarReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonGenerarReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonGenerarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
