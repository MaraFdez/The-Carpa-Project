import { TestBed } from '@angular/core/testing';

import { DetailsUpdateService } from './details-update.service';

describe('DetailsUpdateService', () => {
  let service: DetailsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
