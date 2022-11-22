// Angular dependencies
import { Component, OnInit } from '@angular/core';

// Capacitor dependencies
import { Storage } from '@capacitor/storage';

// Consts
import { USER_ID, USER_NAME } from '../consts';

// Models & Services
import { User, UserService } from '../services/user.service';
import { Post, PostService } from '../services/post.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // User object wrapper
  userData: User = {
    id: '',
    email: '',
    username: '',
    pictureUrl: '',
    biography: '',
    creationDate: ''
  };

  // Current user
  currentUser: string;

  // User's posts
  userPosts: Post[];

  // Users you may know array
  users: User[] = [];

  // Is user on their own profile page
  isOwnProfilePage: boolean;

  constructor(private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.generateContent(params.username);
      this.currentUser = params.username;
    });
  }

  // Get user data from DB
  generateContent(username: string): void {
    // Get single user data - profile
    this.userService.getUser(username)
    .subscribe(({ data }) => {
      this.userData = data.getUser;
    });

    // Get users
    this.userService.getUsersLimited(8)
    .subscribe(async ({ data }) => {
      let users: User[] = [...data.getUsersIterate];

      // Filter current viewed user's profile and logged user's profile and shuffle the array
      const { value } = await Storage.get({ key: USER_NAME });

      this.isOwnProfilePage = this.currentUser === value;

      users = users.filter(
        user => user.username !== this.currentUser && user.username !== value
      ).sort( () => Math.random() - 0.5);

      this.users = users;
    });

    // Get user's posts
    this.postService.getUsersPosts(username)
    .subscribe(({ data }) => {
      this.userPosts = data.getUsersPosts;
    });
  }
}
