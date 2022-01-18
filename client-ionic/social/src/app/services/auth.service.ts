import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';

import {AUTH_TOKEN, USER_DATA, USER_ID, USER_NAME} from '../consts';
import { User, UserService } from './user.service';

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
  // userData: User; // Keep logged users' data
  username: string = null;

  constructor(private apollo: Apollo, private userService: UserService) {

  }

  // Get loaded user in other components using subscription
  getLoadedUser(): Observable<any> {
    var subject = new Subject<any>();

    if (this.username !== null) {
      this.userService.getUser(this.username)
      .subscribe(({ data }) => {
        subject.next(data.getUser);
        localStorage.setItem(USER_DATA, JSON.stringify(data.getUser));
      }, (error) => {      
        console.log('There was an error sending the query', error);
      });
    }

    return subject.asObservable();
  }

  saveUserData(data: any, type: string): void {
    localStorage.clear();

    this.username = type === "log" ? data.login.username : data.register.username;

    // Store user's indentifiers
    localStorage.setItem(AUTH_TOKEN, type === "log" ? data.login.token : data.register.token);
    localStorage.setItem(USER_ID, type === "log" ? data.login.id : data.register.id);
    localStorage.setItem(USER_NAME, type === "log" ? data.login.username : data.register.username);
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

  registerUser(username, email, password, confirmPassword): Observable<any>  {
    return this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        registerInput: {
          username,
          email,
          password,
          confirmPassword        
        }
      }
    })
  }
}
