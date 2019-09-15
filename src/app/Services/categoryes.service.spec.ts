import { TestBed } from '@angular/core/testing';

import { CategoryesService } from './categoryes.service';

describe('CategoryesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryesService = TestBed.get(CategoryesService);
    expect(service).toBeTruthy();
  });
});
