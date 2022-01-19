import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  private router : Router;

  constructor(
    r: Router,
    private authService: AuthService
  ) {
    this.router = r;
  }

  ngOnInit(): void {

  }

  loginUser(): void {
    this.authService.loginUser(this.username, this.password)
    .subscribe(({ data }) => {
      console.log('got data', data);
      this.authService.saveUserData(data, "log");

      this.router.navigate(['/tabs', 'tab1']);
    }, (error) => {
      this.errorMessage = error;
      console.log('there was an error sending the query', error);
    });
  }

}
