import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaColectivaPage } from './memoria-colectiva.page';

describe('MemoriaColectivaPage', () => {
  let component: MemoriaColectivaPage;
  let fixture: ComponentFixture<MemoriaColectivaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriaColectivaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriaColectivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
