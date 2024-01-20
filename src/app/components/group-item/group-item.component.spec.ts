import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemComponent } from './group-item.component';

describe('GroupItemComponent', () => {
  let component: GroupItemComponent;
  let fixture: ComponentFixture<GroupItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
