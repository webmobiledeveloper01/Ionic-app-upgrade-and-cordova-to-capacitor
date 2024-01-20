import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoaskPreguntaEnElMapaPage } from './geoask-pregunta-en-el-mapa.page';

describe('GeoaskPreguntaEnElMapaPage', () => {
  let component: GeoaskPreguntaEnElMapaPage;
  let fixture: ComponentFixture<GeoaskPreguntaEnElMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoaskPreguntaEnElMapaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoaskPreguntaEnElMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
