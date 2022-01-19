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

  errorMessage: String;
  private router : Router;

  constructor(
    r: Router,
    private authService: AuthService) {
      this.router = r;
  }

  ngOnInit(): void {

  }

  registerUser(): void {
    this.authService.registerUser(this.username, this.email, this.password, this.confirmPassword)
    .subscribe(({ data }) => {
      console.log('got data', data);
      this.authService.saveUserData(data, "reg");

      this.router.navigate(['/tabs', 'tab1']);
    }, (error) => {
      this.errorMessage = error;
      console.log('there was an error sending the query', error);
    });
  }
}
