import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomePostComponent } from './app-home-post.component';

describe('AppHomePostComponent', () => {
  let component: AppHomePostComponent;
  let fixture: ComponentFixture<AppHomePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomePostComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
