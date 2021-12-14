import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

import {AUTH_TOKEN, USER_ID, USER_NAME} from '../consts';

// Login Mutation
const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput) {
    login (loginInput: $loginInput) {
      id
      email
      username
      token
      creationDate
    }
  }
`;

// Register Mutation
const REGISTER_MUTATION = gql`
  mutation RegisterMutation($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      username
      email
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Keep logged users' data
  username: string;

  constructor(private apollo: Apollo) {
    
  }

  saveUserData(data : any, type : string) {
    localStorage.clear();

    this.userData = data;
    this.username = type === "log" ? data.login.username : data.register.username;

    localStorage.setItem(AUTH_TOKEN, type === "log" ? data.login.token : data.register.token);
    localStorage.setItem(USER_ID, type === "log" ? data.login.id : data.register.id);
    localStorage.setItem(USER_NAME, type === "log" ? data.login.username : data.register.username)
  }

  loginUser(username, password): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        loginInput: {
          username,
          password
        }
      }
    })
  }

  registerUser(username, email, password, confirmPassword, biography): Observable<any>  {
    return this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        registerInput: {
          username,
          email,
          password,
          confirmPassword,
          biography
        }
      }
    })
  }
}
