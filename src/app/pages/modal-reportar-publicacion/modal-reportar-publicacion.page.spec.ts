import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportarPublicacionPage } from './modal-reportar-publicacion.page';

describe('ModalReportarPublicacionPage', () => {
  let component: ModalReportarPublicacionPage;
  let fixture: ComponentFixture<ModalReportarPublicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReportarPublicacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReportarPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
