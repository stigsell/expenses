import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface Expense {
	id: number;
	date: string;
	place: string;
	amount: string;
	description: string;
	category: string;
	subcategory: string;
};

export interface Response {
	expenses: Expense[];
}

@Injectable({
  providedIn: 'root'
})
export class GetAllExpensesService extends Query<Response> {
	document = gql`
    query GetAllExpenses {
      expenses {
        id
        date
        place
        amount
        description
        category
        subcategory
      }
    }
  `;
}