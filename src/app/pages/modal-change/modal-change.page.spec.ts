import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangePage } from './modal-change.page';

describe('ModalChangePage', () => {
  let component: ModalChangePage;
  let fixture: ComponentFixture<ModalChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
