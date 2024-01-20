import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGroupPostComponent } from './app-group-post.component';

describe('AppGroupPostComponent', () => {
  let component: AppGroupPostComponent;
  let fixture: ComponentFixture<AppGroupPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGroupPostComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGroupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
