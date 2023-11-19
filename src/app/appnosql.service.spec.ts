import { TestBed } from '@angular/core/testing';

import { AppnosqlService } from './servicios/appnosql.service';

describe('AppnosqlService', () => {
  let service: AppnosqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppnosqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
