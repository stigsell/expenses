import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

const routes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'add', component: AddExpenseComponent },
	{ path: 'expenses', component: ExpensesTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
