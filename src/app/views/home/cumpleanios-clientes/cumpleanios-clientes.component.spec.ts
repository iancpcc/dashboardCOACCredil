import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumpleaniosClientesComponent } from './cumpleanios-clientes.component';

describe('CumpleaniosClientesComponent', () => {
  let component: CumpleaniosClientesComponent;
  let fixture: ComponentFixture<CumpleaniosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumpleaniosClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumpleaniosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
