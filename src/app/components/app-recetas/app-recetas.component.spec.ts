import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRecetasComponent } from './app-recetas.component';

describe('AppRecetasComponent', () => {
  let component: AppRecetasComponent;
  let fixture: ComponentFixture<AppRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRecetasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
