import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddExpenseService } from '../add-expense.service';
import { Apollo, gql } from 'apollo-angular';

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

 	constructor(
  		private formBuilder: FormBuilder,
      private addExpenseService: AddExpenseService,
      private apollo: Apollo

  		) { }

  	ngOnInit(): void {

  	}

    onSubmit(): void {
      this.addExpenseService
      .mutate({
        d: this.addExpenseForm.value.date,
        p: this.addExpenseForm.value.place,
        a: this.addExpenseForm.value.amount,
        ds: this.addExpenseForm.value.description,
        c: this.addExpenseForm.value.category,
        s: this.addExpenseForm.value.subcategory
      })
      .subscribe();
      this.addExpenseForm.reset();
    }

}
