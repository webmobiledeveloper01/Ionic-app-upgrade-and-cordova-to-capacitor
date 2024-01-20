import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserFollowerComponent } from './app-user-follower.component';

describe('AppUserFollowerComponent', () => {
  let component: AppUserFollowerComponent;
  let fixture: ComponentFixture<AppUserFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserFollowerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
