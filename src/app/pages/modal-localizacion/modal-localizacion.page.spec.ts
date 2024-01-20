import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocalizacionPage } from './modal-localizacion.page';

describe('ModalLocalizacionPage', () => {
  let component: ModalLocalizacionPage;
  let fixture: ComponentFixture<ModalLocalizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLocalizacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocalizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
