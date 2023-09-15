import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreditsComponent } from './report-credits.component';

describe('ReportCreditsComponent', () => {
  let component: ReportCreditsComponent;
  let fixture: ComponentFixture<ReportCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
