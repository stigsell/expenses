import { Component, OnInit } from '@angular/core';

import { WidgetComponent } from './../widget/widget.component';
import { AddExpenseComponent } from './../add-expense/add-expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
