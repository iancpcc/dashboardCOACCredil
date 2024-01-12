import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosAccesoComponent } from './modulos-acceso.component';

describe('ModulosAccesoComponent', () => {
  let component: ModulosAccesoComponent;
  let fixture: ComponentFixture<ModulosAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulosAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
