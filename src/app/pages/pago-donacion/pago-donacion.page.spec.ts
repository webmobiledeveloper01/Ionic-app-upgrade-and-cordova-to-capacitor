import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDonacionPage } from './pago-donacion.page';

describe('PagoDonacionPage', () => {
  let component: PagoDonacionPage;
  let fixture: ComponentFixture<PagoDonacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoDonacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDonacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
