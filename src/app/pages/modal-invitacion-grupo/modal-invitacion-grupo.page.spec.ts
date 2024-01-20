import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInvitacionGrupoPage } from './modal-invitacion-grupo.page';

describe('ModalInvitacionGrupoPage', () => {
  let component: ModalInvitacionGrupoPage;
  let fixture: ComponentFixture<ModalInvitacionGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInvitacionGrupoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInvitacionGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
