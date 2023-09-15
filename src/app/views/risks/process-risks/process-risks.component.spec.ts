import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRisksComponent } from './process-risks.component';

describe('ProcessRisksComponent', () => {
  let component: ProcessRisksComponent;
  let fixture: ComponentFixture<ProcessRisksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessRisksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
