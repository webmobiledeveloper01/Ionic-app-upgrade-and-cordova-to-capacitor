import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenImagePage } from './fullscreen-image.page';

describe('FullscreenImagePage', () => {
  let component: FullscreenImagePage;
  let fixture: ComponentFixture<FullscreenImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
