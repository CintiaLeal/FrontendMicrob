import { TestBed } from '@angular/core/testing';

import { GestorUsuariosService } from './gestor-usuarios.service';

describe('GestorUsuariosService', () => {
  let service: GestorUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
