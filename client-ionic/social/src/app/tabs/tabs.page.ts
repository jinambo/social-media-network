// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Capacitor dependencies
import { Storage } from '@capacitor/storage';

// Consts
import { USER_DATA } from '../consts';

// Services
import { AuthService } from '../services/auth.service';

// Models
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

  constructor(private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    // Load user from auth service
    this.authService.getLoadedUser().subscribe(r => {
      this.user = r;
      console.log(r)
    })


    const { value } = await Storage.get({ key: USER_DATA });

    // If user was not loaded from auth service, load from local storage (user realoaded page)
    if (value !== null) {
      this.user = JSON.parse(value);
    }
  }
    /*
    if (localStorage.getItem(USER_DATA)) {
      this.user = JSON.parse(localStorage.getItem(USER_DATA));
    } 
    */
}
