import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_TOKEN, USER_DATA, USER_ID, USER_NAME } from '../consts';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';

// upload file mutation
/*
const FILE_MUTAION = gql`
  mutation Upload($file: Upload!) {
    upload(file: $file) {
      filename
    }
  }
`
*/

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private router : Router;

  bio: string = null;
  picUrl: string = null;

  user: User = {
    id: '',
    email: '',
    username: '',
    pictureUrl: '',
    biography: '',
    creationDate: ''
  };

  constructor(private userService: UserService,
    private authService: AuthService, r: Router) {
      this.router = r;

      // Load user from auth service
      authService.getLoadedUser().subscribe(r => {
        this.user = r;
        this.bio = this.user.biography;
        this.picUrl = this.user.pictureUrl;
      })
  }

  ngOnInit(): void {
    // If user was not loaded from auth service, load from local storage (user realoaded page)
    if (localStorage.getItem(USER_DATA)) {
      this.user = JSON.parse(localStorage.getItem(USER_DATA));
      this.bio = this.user.biography;
      this.picUrl = this.user.pictureUrl;
    } 
    console.log(this.user)
  }

  onSubmit() : void {
    console.log('new user info: ' + this.bio + ', ' + this.picUrl)

    this.userService.editUser(localStorage.getItem('user-id'), this.bio, this.picUrl)
    .subscribe(({ data }) => {
      console.log('Profile updated', data);
    }, (error) => {      
      console.log('There was an error sending the query', error);
    });
  }

  logout(): void {
    localStorage.clear();

    // Phone wasn't clearing cache.. 
    localStorage.setItem(USER_NAME, '');
    localStorage.setItem(USER_ID, '');
    localStorage.setItem(USER_DATA, '');
    localStorage.setItem(AUTH_TOKEN, '');

    this.router.navigate(['/', 'login']); 
  }

/*
  fileUpload(file){
    this.apollo.mutate<any>({
      mutation: FILE_MUTAION,
      variables: {
        file: file
      },
      context: {
         useMultipart: true
      }
    }).subscribe(({ data }) => {
      console.log(data)
    });
   }
*/
}
