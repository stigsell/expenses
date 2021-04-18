import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})

export class DeleteExpenseService extends Mutation {
	document = gql`
    mutation DeleteExpense($id: Int!) {
      deleteExpense(id: $id) {
      	success
    }
  }
  `;
}