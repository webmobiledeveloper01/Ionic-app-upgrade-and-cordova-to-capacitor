import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuroProximidadPage } from './muro-proximidad.page';

describe('MuroProximidadPage', () => {
  let component: MuroProximidadPage;
  let fixture: ComponentFixture<MuroProximidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuroProximidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuroProximidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
