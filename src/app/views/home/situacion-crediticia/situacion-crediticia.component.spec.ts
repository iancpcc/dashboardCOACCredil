import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionCrediticiaComponent } from './situacion-crediticia.component';

describe('SituacionCrediticiaComponent', () => {
  let component: SituacionCrediticiaComponent;
  let fixture: ComponentFixture<SituacionCrediticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacionCrediticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacionCrediticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
