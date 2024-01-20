import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyChanelsPage } from './only-chanels.page';

describe('OnlyChanelsPage', () => {
  let component: OnlyChanelsPage;
  let fixture: ComponentFixture<OnlyChanelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyChanelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyChanelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
