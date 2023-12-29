import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfaccionClienteComponent } from './satisfaccion-cliente.component';

describe('SatisfaccionClienteComponent', () => {
  let component: SatisfaccionClienteComponent;
  let fixture: ComponentFixture<SatisfaccionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatisfaccionClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfaccionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
