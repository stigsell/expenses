import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
	expenses = [{
  		date: "",
  		place: "",
  		amount: 0.0,
  		description: "",
  		category: "",
  		subcategory: ""
  	}];
  	totalExpenses: number = 0;
  	averageExpense: number = 0;
  	constructor(
  		private localStorageService: LocalStorageService
  		) { }

  	ngOnInit(): void {
  		this.expenses = this.localStorageService.get("expenses");
  		this.totalExpenses = this.getTotalExpenses();
  		this.averageExpense = this.totalExpenses / this.expenses.length;
  }
  	getTotalExpenses(): number {
  		let sum = 0;
  		console.log(sum);
  		this.expenses.forEach(expense => {
  			if (isNaN(Number(expense.amount))) {
  				console.log("Not a number: " + expense.amount)
  			}
  			sum = sum + Number(expense.amount);
  		})
  		console.log(sum);
  		return sum;
  	}

}
