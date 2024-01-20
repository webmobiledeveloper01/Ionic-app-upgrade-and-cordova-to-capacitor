import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCanalPage } from './crear-canal.page';

describe('CrearCanalPage', () => {
  let component: CrearCanalPage;
  let fixture: ComponentFixture<CrearCanalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCanalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
