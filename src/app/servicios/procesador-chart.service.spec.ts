import { TestBed } from '@angular/core/testing';

import { ProcesadorChartService } from './procesador-chart.service';

describe('ProcesadorChartService', () => {
  let service: ProcesadorChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesadorChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
