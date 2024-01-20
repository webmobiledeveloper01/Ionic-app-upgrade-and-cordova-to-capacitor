import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdBannerComponent } from './app-ad-banner.component';

describe('AppAdBannerComponent', () => {
  let component: AppAdBannerComponent;
  let fixture: ComponentFixture<AppAdBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAdBannerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
