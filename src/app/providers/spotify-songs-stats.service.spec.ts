import { TestBed } from '@angular/core/testing';

import { SpotifySongsStatsService } from './spotify-songs-stats.service';

describe('SpotifySongsStatsService', () => {
  let service: SpotifySongsStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifySongsStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
