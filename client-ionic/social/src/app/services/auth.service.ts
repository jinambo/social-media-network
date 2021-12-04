import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

import {AUTH_TOKEN, USER_ID} from '../consts';

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

    localStorage.setItem(AUTH_TOKEN, type === "log" ? data.login.token : data.register.token);
    localStorage.setItem(USER_ID, type === "log" ? data.login.id : data.register.id);
  }

  loginUser(username, password): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        loginInput: {
          username: username,
          password: password
        }
      }
    })
  }

  registerUser(username, email, password, confirmPassword): Observable<any>  {
    return this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        registerInput: {
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        }
      }
    })
  }
}
