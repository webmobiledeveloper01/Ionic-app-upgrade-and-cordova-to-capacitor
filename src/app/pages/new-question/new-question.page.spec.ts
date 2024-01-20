import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionPage } from './new-question.page';

describe('NewQuestionPage', () => {
  let component: NewQuestionPage;
  let fixture: ComponentFixture<NewQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
