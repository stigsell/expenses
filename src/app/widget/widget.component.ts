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
  	constructor(
  		private localStorageService: LocalStorageService
  		) { }

  	ngOnInit(): void {
  		this.expenses = this.localStorageService.get("expenses");
  		this.totalExpenses = this.getTotalExpenses();
  }
  	getTotalExpenses(): number {
  		let sum = 0;
  		this.expenses.forEach(expense => {
  			sum = sum + Number(expense.amount);
  		})
  		return sum;
  	}

}
