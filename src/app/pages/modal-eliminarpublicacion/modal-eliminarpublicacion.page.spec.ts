import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarpublicacionPage } from './modal-eliminarpublicacion.page';

describe('ModalEliminarpublicacionPage', () => {
  let component: ModalEliminarpublicacionPage;
  let fixture: ComponentFixture<ModalEliminarpublicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarpublicacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarpublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
