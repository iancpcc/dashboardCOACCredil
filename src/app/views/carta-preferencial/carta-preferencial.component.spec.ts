import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaPreferencialComponent } from './carta-preferencial.component';

describe('CartaPreferencialComponent', () => {
  let component: CartaPreferencialComponent;
  let fixture: ComponentFixture<CartaPreferencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaPreferencialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaPreferencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
