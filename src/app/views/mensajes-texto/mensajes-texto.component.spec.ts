import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesTextoComponent } from './mensajes-texto.component';

describe('MensajesTextoComponent', () => {
  let component: MensajesTextoComponent;
  let fixture: ComponentFixture<MensajesTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesTextoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
