import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferenciacionComponent } from './georeferenciacion.component';

describe('GeoreferenciacionComponent', () => {
  let component: GeoreferenciacionComponent;
  let fixture: ComponentFixture<GeoreferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoreferenciacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoreferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
