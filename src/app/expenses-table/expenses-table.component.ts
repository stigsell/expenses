import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Expense, GetAllExpensesService } from '../get-all-expenses.service';
import { DeleteExpenseService } from '../delete-expense.service';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit {
  expenses: any;
  getExpensesQuery!: QueryRef<any>;
  loading = true;
  showButton = false;
  buttonId: Number;
  private querySubscription!: Subscription;

	constructor(
		private getAllExpensesService: GetAllExpensesService,
    private deleteExpenseService: DeleteExpenseService
		) { 
      this.buttonId = -1;
  }

  ngOnInit(): void {
    this.getExpensesQuery = this.getAllExpensesService.watch({

    }, {
      pollInterval: 500  // check for new data every .5 seconds. 
      // AddExpense doesn't update the table so this is necessary. 
      // It is not necessary for deleteExpense.
    });
    this.querySubscription = this.getExpensesQuery
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.expenses = data.expenses;
    });
  }

  deleteRow(id: Number): void {
    this.deleteExpenseService
      .mutate({
        id: id
      })
      .subscribe();
     this.getExpensesQuery.refetch();  // refresh table
  }
}
