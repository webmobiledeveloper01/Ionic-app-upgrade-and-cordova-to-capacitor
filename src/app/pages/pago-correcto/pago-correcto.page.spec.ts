import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCorrectoPage } from './pago-correcto.page';

describe('PagoCorrectoPage', () => {
  let component: PagoCorrectoPage;
  let fixture: ComponentFixture<PagoCorrectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoCorrectoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
