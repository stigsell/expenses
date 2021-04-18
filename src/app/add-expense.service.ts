import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})

export class AddExpenseService extends Mutation {
	document = gql`
    mutation CreateExpense($d: String!, $p: String!, $a: String!, $ds: String!, $c: String!, $s: String) {
      createExpense(date: $d, place: $p, amount: $a, description: $ds, category: $c, subcategory:$s) {
      id
    }
}
  `;
}