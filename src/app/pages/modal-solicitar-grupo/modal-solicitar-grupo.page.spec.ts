import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitarGrupoPage } from './modal-solicitar-grupo.page';

describe('ModalSolicitarGrupoPage', () => {
  let component: ModalSolicitarGrupoPage;
  let fixture: ComponentFixture<ModalSolicitarGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSolicitarGrupoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitarGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
