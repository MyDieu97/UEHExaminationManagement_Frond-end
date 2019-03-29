import { TestBed } from '@angular/core/testing';

import { DeThiService } from './de-thi.service';

describe('DeThiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeThiService = TestBed.get(DeThiService);
    expect(service).toBeTruthy();
  });
});
