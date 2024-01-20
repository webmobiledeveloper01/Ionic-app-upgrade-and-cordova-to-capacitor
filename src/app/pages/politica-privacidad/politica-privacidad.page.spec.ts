import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaPrivacidadPage } from './politica-privacidad.page';

describe('PoliticaPrivacidadPage', () => {
  let component: PoliticaPrivacidadPage;
  let fixture: ComponentFixture<PoliticaPrivacidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaPrivacidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaPrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
