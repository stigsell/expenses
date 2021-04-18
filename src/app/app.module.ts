import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { HeaderComponent } from './header/header.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { WidgetComponent } from './widget/widget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    HeaderComponent,
    ExpensesTableComponent,
    WidgetComponent,
    DashboardComponent,
    EditExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
