import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  private router : Router;

  constructor(private authService : AuthService, r: Router) {
    this.router = r;

    console.log(authService.userData)
    
    // if user is not logged in, redirect to the login page
    if (authService.userData == null) {
      // this.router.navigate(['/', 'login']); 
    }
  }

  ngOnInit() {

  }
}
