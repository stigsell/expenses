import { TestBed } from '@angular/core/testing';

import { AddExpenseService } from './add-expense.service';

describe('AddExpenseService', () => {
  let service: AddExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
