import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappPage } from './mapp.page';

describe('MappPage', () => {
  let component: MappPage;
  let fixture: ComponentFixture<MappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
