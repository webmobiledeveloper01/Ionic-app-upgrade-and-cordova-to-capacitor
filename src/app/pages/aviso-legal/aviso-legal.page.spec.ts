import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoLegalPage } from './aviso-legal.page';

describe('AvisoLegalPage', () => {
  let component: AvisoLegalPage;
  let fixture: ComponentFixture<AvisoLegalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoLegalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoLegalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
