import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportarMotivoPage } from './modal-reportar-motivo.page';

describe('ModalReportarMotivoPage', () => {
  let component: ModalReportarMotivoPage;
  let fixture: ComponentFixture<ModalReportarMotivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReportarMotivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    export class MiPopUpModule {}
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReportarMotivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
