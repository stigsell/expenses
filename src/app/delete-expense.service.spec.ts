import { TestBed } from '@angular/core/testing';

import { DeleteExpenseService } from './delete-expense.service';

describe('DeleteExpenseService', () => {
  let service: DeleteExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
