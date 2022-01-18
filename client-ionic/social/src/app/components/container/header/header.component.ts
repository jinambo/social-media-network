import { Component, Input, OnInit } from '@angular/core';
import { USER_DATA, USER_NAME } from 'src/app/consts';
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
    console.log('fired')
    // Load user from auth service
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
