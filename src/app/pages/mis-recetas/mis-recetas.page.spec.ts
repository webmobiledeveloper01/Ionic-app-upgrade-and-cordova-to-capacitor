import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRecetasPage } from './mis-recetas.page';

describe('MisRecetasPage', () => {
  let component: MisRecetasPage;
  let fixture: ComponentFixture<MisRecetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisRecetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
