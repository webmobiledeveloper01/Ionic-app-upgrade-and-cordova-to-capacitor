import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaStreetPage } from './mapa-street.page';

describe('MapaStreetPage', () => {
  let component: MapaStreetPage;
  let fixture: ComponentFixture<MapaStreetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaStreetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaStreetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
