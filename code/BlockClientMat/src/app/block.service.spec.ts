import { TestBed } from '@angular/core/testing';

import { BlockService } from './block.service';

describe('BlockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockService = TestBed.get(BlockService);
    expect(service).toBeTruthy();
  });
});
