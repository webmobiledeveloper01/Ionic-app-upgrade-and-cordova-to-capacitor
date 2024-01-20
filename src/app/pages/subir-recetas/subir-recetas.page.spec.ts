import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirRecetasPage } from './subir-recetas.page';

describe('SubirRecetasPage', () => {
  let component: SubirRecetasPage;
  let fixture: ComponentFixture<SubirRecetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirRecetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
