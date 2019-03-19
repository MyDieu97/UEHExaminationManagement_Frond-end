import { TestBed } from '@angular/core/testing';

import { DonViService } from './don-vi.service';

describe('DonViService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonViService = TestBed.get(DonViService);
    expect(service).toBeTruthy();
  });
});
