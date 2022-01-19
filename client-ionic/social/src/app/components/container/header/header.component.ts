// Angular dependencies
import { Component, Input, OnInit } from '@angular/core';

// Capacitor dependencies
import { Storage } from '@capacitor/storage';

// Storage consts
import { USER_DATA, USER_NAME } from 'src/app/consts';

// Services
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title : String;

  user: User = {
    id: '',
    email: '',
    username: '',
    pictureUrl: '',
    biography: '',
    creationDate: ''
  };

  constructor(private authService: AuthService) {
    // Load user from auth service
    console.log('header get data from db')
  }

  async ngOnInit(): Promise<void> {
    this.authService.getLoadedUser().subscribe(r => {
      this.user = r;
      // console.log(r)
    })

    const { value } = await Storage.get({ key: USER_DATA });

    // If user was not loaded from auth service, load from local storage (user realoaded page)
    if (value !== null) {
      this.user = JSON.parse(value);
    }
  }

}
