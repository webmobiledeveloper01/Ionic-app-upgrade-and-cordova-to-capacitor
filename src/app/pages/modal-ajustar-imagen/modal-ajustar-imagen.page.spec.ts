import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjustarImagenPage } from './modal-ajustar-imagen.page';

describe('ModalAjustarImagenPage', () => {
  let component: ModalAjustarImagenPage;
  let fixture: ComponentFixture<ModalAjustarImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAjustarImagenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjustarImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
