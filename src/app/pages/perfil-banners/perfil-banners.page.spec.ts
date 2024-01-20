import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilBannersPage } from './perfil-banners.page';

describe('PerfilBannersPage', () => {
  let component: PerfilBannersPage;
  let fixture: ComponentFixture<PerfilBannersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilBannersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
