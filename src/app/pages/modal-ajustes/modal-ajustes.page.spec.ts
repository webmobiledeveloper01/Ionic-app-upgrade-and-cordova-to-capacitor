import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjustesPage } from './modal-ajustes.page';

describe('ModalAjustesPage', () => {
  let component: ModalAjustesPage;
  let fixture: ComponentFixture<ModalAjustesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAjustesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjustesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
