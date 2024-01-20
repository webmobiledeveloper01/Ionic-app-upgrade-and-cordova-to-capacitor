import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaPaginaPage } from './memoria-pagina.page';

describe('MemoriaPaginaPage', () => {
  let component: MemoriaPaginaPage;
  let fixture: ComponentFixture<MemoriaPaginaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriaPaginaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriaPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
