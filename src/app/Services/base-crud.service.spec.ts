import { TestBed } from '@angular/core/testing';

import { BaseCRUDService } from './base-crud.service';

describe('BaseCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseCRUDService = TestBed.get(BaseCRUDService);
    expect(service).toBeTruthy();
  });
});
