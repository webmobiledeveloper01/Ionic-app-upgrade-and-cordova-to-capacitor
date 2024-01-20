import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecetasPage } from './detalle-recetas.page';

describe('DetalleRecetasPage', () => {
  let component: DetalleRecetasPage;
  let fixture: ComponentFixture<DetalleRecetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRecetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
