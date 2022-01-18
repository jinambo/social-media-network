import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_DATA } from '../consts';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  private router : Router;

  user: User = {
    id: '',
    email: '',
    username: '',
    pictureUrl: '',
    biography: '',
    creationDate: ''
  };

  constructor(private authService : AuthService, r: Router) {
    this.router = r;

    authService.getLoadedUser().subscribe(r => {
      this.user = r;
    })
  }

  ngOnInit(): void {
    // If user was not loaded from auth service, load from local storage (user realoaded page)
    if (localStorage.getItem(USER_DATA)) {
      this.user = JSON.parse(localStorage.getItem(USER_DATA));
    } 
    console.log(this.user)
  }
}
