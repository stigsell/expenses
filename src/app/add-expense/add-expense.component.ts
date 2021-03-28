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
	checkoutForm = this.formBuilder.group({
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
  		amount: "",
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
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    console.log(this.checkoutForm.value);
    console.log(this.expenses);
    this.expenses.push(this.checkoutForm.value);
    this.localStorageService.set("expenses", this.expenses);
    console.log(this.expenses);
    this.checkoutForm.reset();
  }

}
