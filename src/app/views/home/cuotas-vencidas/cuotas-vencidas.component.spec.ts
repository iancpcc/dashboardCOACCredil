import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotasVencidasComponent } from './cuotas-vencidas.component';

describe('CuotasVencidasComponent', () => {
  let component: CuotasVencidasComponent;
  let fixture: ComponentFixture<CuotasVencidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotasVencidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuotasVencidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
