import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

// Edit User Mutation
const EDIT_USER_MUTATION = gql`
  mutation EditUser($userId: ID!, $biography: String, $pictureUrl: String) {
    editUser(userId: $userId, biography: $biography, pictureUrl: $pictureUrl) {
      id
      username
      biography
      pictureUrl
    }
  }
`

// All Users Query
const USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      email
      username
      pictureUrl
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
      pictureUrl
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
      pictureUrl
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
  pictureUrl: string,
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

  editUser(userId: string, biography: string, pictureUrl: string): Observable<any> {
    return this.apollo.mutate({
      mutation: EDIT_USER_MUTATION,
      variables: {
        userId,
        biography,
        pictureUrl
      }
    })
  }

  getUser(username: string): Observable<any> {
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
