import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportarPage } from './modal-reportar.page';

describe('ModalReportarPage', () => {
  let component: ModalReportarPage;
  let fixture: ComponentFixture<ModalReportarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReportarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReportarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
