import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

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
  	expenses = [{
  		date: "",
  		place: "",
  		amount: 0.0,
  		description: "",
  		category: "",
  		subcategory: ""
  	}];
 	constructor(
  		private formBuilder: FormBuilder,
  		private localStorageService: LocalStorageService

  		) { }

  	ngOnInit(): void {
  		this.expenses = this.localStorageService.get("expenses");
  		if (Object.keys(this.expenses).length === 0) {
  			this.expenses = [];
  		}
  	}

  	onSubmit(): void {
    if (this.addExpenseForm.value.date != "" &&
      this.addExpenseForm.value.place != "" && 
      this.addExpenseForm.value.amount != "" && 
      this.addExpenseForm.value.description != "" && 
      this.addExpenseForm.value.category != "") {
      console.log(this.addExpenseForm.value);
      console.log(this.expenses);
      this.expenses.push(this.addExpenseForm.value);
      this.localStorageService.set("expenses", this.expenses);
      console.log(this.expenses);
      this.addExpenseForm.reset();
      location.reload();
    }
    
  }

}
