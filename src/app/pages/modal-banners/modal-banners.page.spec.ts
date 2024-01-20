import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBannersPage } from './modal-banners.page';

describe('ModalBannersPage', () => {
  let component: ModalBannersPage;
  let fixture: ComponentFixture<ModalBannersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBannersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
