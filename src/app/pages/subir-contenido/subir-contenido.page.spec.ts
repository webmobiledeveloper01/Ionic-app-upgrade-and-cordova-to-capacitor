import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirContenidoPage } from './subir-contenido.page';

describe('SubirContenidoPage', () => {
  let component: SubirContenidoPage;
  let fixture: ComponentFixture<SubirContenidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirContenidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
