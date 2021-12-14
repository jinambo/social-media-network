import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
  biography: String;

  errorMessage: String;
  private router : Router;

  constructor(
    r: Router,
    private authService: AuthService) {
      this.router = r;
  }

  registerUser() {
    this.authService.registerUser(this.username, this.email, this.password, this.confirmPassword, this.biography)
    .subscribe(({ data }) => {
      console.log('got data', data);
      this.authService.userData = data;
      this.authService.saveUserData(data, "reg");

      this.router.navigate(['/tabs', 'tab1']);
    }, (error) => {
      this.errorMessage = error;
      console.log('there was an error sending the query', error);
    });
  }

  ngOnInit() {

  }
}
