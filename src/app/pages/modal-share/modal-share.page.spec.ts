import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSharePage } from './modal-share.page';

describe('ModalSharePage', () => {
  let component: ModalSharePage;
  let fixture: ComponentFixture<ModalSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
