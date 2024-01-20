import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInvitePage } from './modal-invite.page';

describe('ModalInvitePage', () => {
  let component: ModalInvitePage;
  let fixture: ComponentFixture<ModalInvitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInvitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInvitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
