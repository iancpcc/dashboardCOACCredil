import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosAdjudicadosComponent } from './creditos-adjudicados.component';

describe('CreditosAdjudicadosComponent', () => {
  let component: CreditosAdjudicadosComponent;
  let fixture: ComponentFixture<CreditosAdjudicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditosAdjudicadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditosAdjudicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
