import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirBannerPage } from './subir-banner.page';

describe('SubirBannerPage', () => {
  let component: SubirBannerPage;
  let fixture: ComponentFixture<SubirBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirBannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
