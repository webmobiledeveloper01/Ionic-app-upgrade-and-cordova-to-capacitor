import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePublicacionPage } from './detalle-publicacion.page';

describe('DetallePublicacionPage', () => {
  let component: DetallePublicacionPage;
  let fixture: ComponentFixture<DetallePublicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePublicacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
