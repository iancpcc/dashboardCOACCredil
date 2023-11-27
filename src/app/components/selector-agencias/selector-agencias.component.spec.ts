import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorAgenciasComponent } from './selector-agencias.component';

describe('SelectorAgenciasComponent', () => {
  let component: SelectorAgenciasComponent;
  let fixture: ComponentFixture<SelectorAgenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorAgenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorAgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
