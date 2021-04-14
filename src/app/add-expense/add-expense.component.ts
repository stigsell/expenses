import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Apollo, gql } from 'apollo-angular';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
	addExpenseForm = this.formBuilder.group({
    	date: '',
    	place: '',
    	amount: '',
    	description: '',
    	category: '',
    	subcategory: ''
  	});
  ADD_EXPENSE = gql`
    mutation CreateExpense($d: String!, $p: String!, $a: String!, $ds: String!, $c: String!, $s: String) {
      createExpense(date: $d, place: $p, amount: $a, description: $ds, category: $c, subcategory:$s) {
      id
    }
}
  `;

 	constructor(
  		private formBuilder: FormBuilder,
  		private localStorageService: LocalStorageService,
      private apollo: Apollo

  		) { }

  	ngOnInit(): void {

  	}

    onSubmit(): void {
      if(environment.production) {
        if (this.addExpenseForm.value.date != "" &&
          this.addExpenseForm.value.place != "" && 
          this.addExpenseForm.value.amount != "" && 
          this.addExpenseForm.value.description != "" && 
          this.addExpenseForm.value.category != "") {
          let expenses = this.localStorageService.get('expenses');
          if(expenses == {}) {
            expenses = [];
          }
          console.log(expenses)
          console.log(this.addExpenseForm.value);
          expenses.push(this.addExpenseForm.value);
          console.log(expenses);
          this.localStorageService.set("expenses", expenses);
          this.addExpenseForm.reset();
          location.reload();
        }
      } else {
        this.apollo.mutate({
          mutation: this.ADD_EXPENSE,
          variables: {
            d: this.addExpenseForm.value.date,
            p: this.addExpenseForm.value.place,
            a: this.addExpenseForm.value.amount,
            ds: this.addExpenseForm.value.description,
            c: this.addExpenseForm.value.category,
            s: this.addExpenseForm.value.subcategory
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

}
