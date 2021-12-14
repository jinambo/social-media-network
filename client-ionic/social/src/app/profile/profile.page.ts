import { Component, OnInit } from '@angular/core';

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
    biography: '',
    creationDate: ''
  };

  // User's posts
  userPosts: Post[];

  // Users you may know array
  users: User[] = [];

  currentUserName: string;

  constructor(private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.currentUserName = params.username; 
    });

    this.generateContent();
  }

  showProfile(username: string) {
    this.currentUserName = username;

    this.generateContent();
  }

  generateContent() {
    // Get single user data - profile
    this.userService.getUser(this.currentUserName)
    .subscribe(({ data }) => {
      this.userData = data.getUser;
    });

    // Get users
    this.userService.getUsersLimited(5)
    .subscribe(({ data }) => {
      this.users = data.getUsersIterate;
    });

    // Get user's posts
    this.postService.getUsersPosts(this.currentUserName)
    .subscribe(({ data }) => {
      this.userPosts = data.getUsersPosts;
    });
  }
}
