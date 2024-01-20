import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSeleccionPage } from './mapa-seleccion.page';

describe('MapaSeleccionPage', () => {
  let component: MapaSeleccionPage;
  let fixture: ComponentFixture<MapaSeleccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaSeleccionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaSeleccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
