import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit {
 	expenses: any[];
  loading = true;
  error: any;


  GET_ALL_EXPENSES = gql`
    query GetAllExpenses {
      expenses {
        id
        date
        place
        amount
        description
        category
        subcategory
      }
    }
  `;
	constructor(
		private localStorageService: LocalStorageService,
    private apollo: Apollo
		) { 
      this.expenses = [];
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: this.GET_ALL_EXPENSES,
    })
    .valueChanges.subscribe((result: any) => {
      this.expenses = result?.data?.expenses;
      this.loading = result.loading;
      this.error = result.error;
      console.log(this.expenses);
    })

  }

}
