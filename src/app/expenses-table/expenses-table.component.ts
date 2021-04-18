import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Expense, GetAllExpensesService } from '../get-all-expenses.service';
import { DeleteExpenseService } from '../delete-expense.service';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit {
 	expenses!: Observable<Expense[]>;
  loading = true;
  error: any;
  showButton = false;
  buttonId: Number;

	constructor(
		private getAllExpensesService: GetAllExpensesService,
    private deleteExpenseService: DeleteExpenseService
		) { 
      this.buttonId = -1;
  }

  ngOnInit(): void {
    this.expenses = this.getAllExpensesService.watch()
      .valueChanges
      .pipe(
        map(result => result.data.expenses)
        );

  }

  deleteRow(id: Number): void {
    this.deleteExpenseService
      .mutate({
        id: id
      })
      .subscribe();
     location.reload();  // TODO don't refresh the page visually to the user
  }

}
