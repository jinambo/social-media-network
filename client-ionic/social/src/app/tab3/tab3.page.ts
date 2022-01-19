// Angular dependencies
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Capacitor dependencies
import { Storage } from '@capacitor/storage';

// Storage consts
import { AUTH_TOKEN, USER_DATA, USER_ID, USER_NAME } from '../consts';

// Services
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

  async ngOnInit(): Promise<void> {
    const { value } = await Storage.get({ key: USER_DATA })
    
    // If user was not loaded from auth service, load from local storage (user realoaded page)
    if (value !== null) {
      this.user = JSON.parse(value);

      this.bio = this.user.biography;
      this.picUrl = this.user.pictureUrl;
    } 
  }

  // Edit profile 
  async onSubmit() : Promise<void> {
    // Get UID
    const { value } = await Storage.get({ key: USER_ID })

    this.userService.editUser(value, this.bio, this.picUrl)
    .subscribe(({ data }) => {
      console.log('Profile updated', data);
      this.router.navigate([`/tabs/profile/${ this.user.username }`]);

    }, (error) => {      
      console.log('There was an error sending the query', error);
    });
  }

  // Logout user
  async logout(): Promise<void> {
    this.authService.logout();

    // Route login page
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
