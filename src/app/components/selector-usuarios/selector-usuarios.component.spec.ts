import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorUsuariosComponent } from './selector-usuarios.component';

describe('SelectorUsuariosComponent', () => {
  let component: SelectorUsuariosComponent;
  let fixture: ComponentFixture<SelectorUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
