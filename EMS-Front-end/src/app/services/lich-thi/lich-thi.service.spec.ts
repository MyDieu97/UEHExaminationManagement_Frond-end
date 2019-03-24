import { TestBed } from '@angular/core/testing';

import { LichThiService } from './lich-thi.service';

describe('LichThiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LichThiService = TestBed.get(LichThiService);
    expect(service).toBeTruthy();
  });
});
