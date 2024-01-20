import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuestionItemComponent } from './app-question-item.component';

describe('AppQuestionItemComponent', () => {
  let component: AppQuestionItemComponent;
  let fixture: ComponentFixture<AppQuestionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuestionItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
