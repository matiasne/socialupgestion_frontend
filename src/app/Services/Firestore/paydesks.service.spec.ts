import { TestBed } from '@angular/core/testing';

import { PaydesksService } from './paydesks.service';

describe('PaydesksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaydesksService = TestBed.get(PaydesksService);
    expect(service).toBeTruthy();
  });
});
