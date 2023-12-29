import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNoAuthorizedComponent } from './page-no-authorized.component';

describe('PageNoAuthorizedComponent', () => {
  let component: PageNoAuthorizedComponent;
  let fixture: ComponentFixture<PageNoAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNoAuthorizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNoAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
