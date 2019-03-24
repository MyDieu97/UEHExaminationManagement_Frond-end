import { TestBed } from '@angular/core/testing';

import { HocPhanService } from './hoc-phan.service';

describe('HocPhanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HocPhanService = TestBed.get(HocPhanService);
    expect(service).toBeTruthy();
  });
});
