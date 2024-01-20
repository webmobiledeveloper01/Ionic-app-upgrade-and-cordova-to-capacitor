import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisBannersPage } from './mis-banners.page';

describe('MisBannersPage', () => {
  let component: MisBannersPage;
  let fixture: ComponentFixture<MisBannersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisBannersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
