import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoSponsorPage } from './modal-info-sponsor.page';

describe('ModalInfoSponsorPage', () => {
  let component: ModalInfoSponsorPage;
  let fixture: ComponentFixture<ModalInfoSponsorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfoSponsorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoSponsorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
