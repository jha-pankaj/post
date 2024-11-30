// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers() :Observable<any>{
    return this.apollo.query({
      query: gql`
        query {
          users {
            id
            name
            email
          }
        }
      `,
    });
  }

  getUserByEmail(email: string): Observable<any> {
    const GET_USER_BY_EMAIL = gql`
      query GetUserByEmail($email: String!) {
        userByEmail(email: $email) {
          id
          name
          email
        }
      }
    `;

    return this.apollo.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });
  }


  addUser(name: string, email: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($name: String!, $email: String!) {
          addUser(name: $name, email: $email) {
            id
            name
            email
          }
        }
      `,
      variables: { name, email },
    });
  }
}
