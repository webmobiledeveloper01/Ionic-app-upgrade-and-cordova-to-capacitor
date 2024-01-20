import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectUserComponent } from './app-select-user.component';

describe('AppSelectUserComponent', () => {
  let component: AppSelectUserComponent;
  let fixture: ComponentFixture<AppSelectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSelectUserComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
