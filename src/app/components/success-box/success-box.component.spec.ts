import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBoxComponent } from './success-box.component';

describe('SuccessBoxComponent', () => {
  let component: SuccessBoxComponent;
  let fixture: ComponentFixture<SuccessBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
