import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPinPage } from './crear-pin.page';

describe('CrearPinPage', () => {
  let component: CrearPinPage;
  let fixture: ComponentFixture<CrearPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
