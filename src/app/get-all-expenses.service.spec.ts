import { TestBed } from '@angular/core/testing';

import { GetAllExpensesService } from './get-all-expenses.service';

describe('GetAllExpensesService', () => {
  let service: GetAllExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
