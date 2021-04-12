import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
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
  	totalExpenses: number = 0;
  	averageExpense: number = 0;
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
        this.totalExpenses = this.getTotalExpenses();
        this.averageExpense = this.totalExpenses / this.expenses.length;
        console.log(this.averageExpense);
      })
  		// this.expenses = this.localStorageService.get("expenses");
  		
  }
  	getTotalExpenses(): number {
  		let sum = 0;
  		this.expenses.forEach(expense => {
  			if (isNaN(Number(expense.amount))) {
  				console.log("Not a number: " + expense.amount)
  			}
  			sum = sum + Number(expense.amount);
  		})
  		return sum;
  	}

}
