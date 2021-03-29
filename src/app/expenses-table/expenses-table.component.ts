import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit {
	expenses = [{
  		date: "",
  		place: "",
  		amount: 0.0,
  		description: "",
  		category: "",
  		subcategory: ""
  	}];
	constructor(
		private localStorageService: LocalStorageService
		) { }

  ngOnInit(): void {
  	this.expenses = this.localStorageService.get("expenses");
  	console.log(this.expenses)
  		// if (Object.keys(this.expenses).length === 0) {
  		// 	this.expenses = [];
  		// }
  }

}
