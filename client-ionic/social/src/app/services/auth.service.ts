// Ionic dependencies
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

// Capacitor dependencies
import { Storage } from '@capacitor/storage';

// RXJS async
import { Observable, Subject } from 'rxjs';

// Storage consts
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

  async logout(): Promise<void> {
    await Storage.clear();
    this.username = null;
  }

  // Get loaded user in other components using subscription
  getLoadedUser(): Observable<any> {
    var subject = new Subject<any>();

    if (this.username !== null) {
      this.userService.getUser(this.username)
      .subscribe(async ({ data }) => {
        // Save to capacitor storage
        
        await Storage.set({
          key: USER_DATA,
          value: JSON.stringify(data.getUser),
        });
        

        await subject.next(data.getUser);

      }, (error) => {      
        console.log('There was an error sending the query', error);
      });
    }

    return subject.asObservable();
  }

  async saveUserData(data: any, type: string): Promise<void> {
    this.username = type === "log" ? data.login.username : data.register.username;

    //localStorage.clear();
    await Storage.clear();

    // Store user's indentifiers
    
    await Storage.set({
      key: AUTH_TOKEN,
      value: type === "log" ? data.login.token : data.register.token,
    });

    await Storage.set({
      key: USER_ID,
      value: type === "log" ? data.login.id : data.register.id,
    });

    await Storage.set({
      key: USER_NAME,
      value: type === "log" ? data.login.username : data.register.username,
    });
    

    //localStorage.setItem(AUTH_TOKEN, type === "log" ? data.login.token : data.register.token);
    //localStorage.setItem(USER_ID, type === "log" ? data.login.id : data.register.id);
    //localStorage.setItem(USER_NAME, type === "log" ? data.login.username : data.register.username);
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
