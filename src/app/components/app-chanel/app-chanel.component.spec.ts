import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChanelComponent } from './app-chanel.component';

describe('AppChanelComponent', () => {
  let component: AppChanelComponent;
  let fixture: ComponentFixture<AppChanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChanelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
