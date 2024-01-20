import { TestBed } from '@angular/core/testing';

import { AppVariablesService } from './app-variables.service';

describe('AppVariablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppVariablesService = TestBed.get(AppVariablesService);
    expect(service).toBeTruthy();
  });
});
