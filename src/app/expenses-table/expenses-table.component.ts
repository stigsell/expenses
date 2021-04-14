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
  showButton = false;
  buttonId: Number;


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

  DELETE_EXPENSE = gql`
    mutation DeleteExpense($id: Int!) {
      deleteExpense(id: $id) {
      success
    }
  }
  `;
	constructor(
		private localStorageService: LocalStorageService,
    private apollo: Apollo
		) { 
      this.expenses = [];
      this.buttonId = -1;
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

  deleteRow(id: Number): void {
    console.log(id);
    this.buttonId = id;
    this.apollo.mutate({
        mutation: this.DELETE_EXPENSE,
        variables: {
          id: id
        }
      }).subscribe(({data}) => {
        console.log(data);
        location.reload();  // TODO don't refresh the page visually to the user
        // TODO provide visual confirmation to user that expense was added successfully
      }, (error) => {
        console.log("Error", error);
      });
  }

}
