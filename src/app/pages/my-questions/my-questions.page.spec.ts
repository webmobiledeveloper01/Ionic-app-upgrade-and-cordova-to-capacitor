import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionsPage } from './my-questions.page';

describe('MyQuestionsPage', () => {
  let component: MyQuestionsPage;
  let fixture: ComponentFixture<MyQuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
