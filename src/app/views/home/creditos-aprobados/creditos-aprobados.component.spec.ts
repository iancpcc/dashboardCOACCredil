import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosAprobadosComponent } from './creditos-aprobados.component';

describe('CreditosAprobadosComponent', () => {
  let component: CreditosAprobadosComponent;
  let fixture: ComponentFixture<CreditosAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditosAprobadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
