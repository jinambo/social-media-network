import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

// All Users Query
const USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      email
      username
      biography
      creationDate
    }
  }
`;

// Get Users - limited count by parameter
const USERS_LIMITED_QUERY = gql`
  query GetUsersIterate($first: Int!) {
    getUsersIterate(first: $first) {
      id
      email
      username
      biography
      creationDate
    }
  }
`

// User By ID Query
const USER_QUERY = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      email
      username
      biography
      creationDate
    }
  }
`;

// Models
export interface User {
  id: string,
  email: string,
  username: string,
  biography: string,
  creationDate: string
}

export interface UsersResponse {
  getUsers: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  getUser(username): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: USER_QUERY,
      variables: {
        username: username
      }
    })
    .valueChanges
  }

  getUsers(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: USERS_QUERY
    })
    .valueChanges
  }

  getUsersLimited(count: Number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: USERS_LIMITED_QUERY,
      variables: {
        first: count
      }
    })
    .valueChanges
  }
}
