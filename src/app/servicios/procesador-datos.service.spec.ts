import { TestBed } from '@angular/core/testing';

import { ProcesadorDatosService } from './procesador-datos.service';

describe('ProcesadorDatosService', () => {
  let service: ProcesadorDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesadorDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
