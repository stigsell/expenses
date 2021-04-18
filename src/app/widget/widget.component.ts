import { Component, OnInit } from '@angular/core';
import { Expense, GetAllExpensesService } from '../get-all-expenses.service';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
    expenses: any;
    getExpensesQuery!: QueryRef<any>;
    loading = true;
    private querySubscription!: Subscription;
  	totalExpenses: number = 0;
  	averageExpense: number = 0;

  	constructor(
  		private getAllExpensesService: GetAllExpensesService,
      private apollo: Apollo
  		) { 
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
      this.totalExpenses = this.getTotalExpenses();
      this.averageExpense = this.getTotalExpenses() / this.expenses.length;
    });
  }
  	getTotalExpenses(): number {
  		let sum = 0;
  		this.expenses.forEach((expense: any) => {
  			if (isNaN(Number(expense.amount))) {
  				console.log("Not a number: " + expense.amount)
  			}
  			sum = sum + Number(expense.amount);
  		})
  		return sum;
  	}

}
