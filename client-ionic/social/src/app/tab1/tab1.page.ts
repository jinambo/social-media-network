import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommentsPage } from '../modals/comments/comments.page';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { SettingsComponent } from '../components/post/settings/settings.component';

// Services
import { PostService } from '../services/post.service';

// Models
import { Post } from '../services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  modalDataResponse: any;

  loading: boolean;     // is the component loading
  posts: Post[] = [];   // posts

  private querySubscription: Subscription;

  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    private postService: PostService) {}

  ngAfterContentInit() {
    console.log('dom changed');
  }

  ngOnInit() {
    this.postService.getPosts()
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.posts = data.getPosts;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  /*removeClient(postID) {
    this.posts = this.posts.filter(post => post.id !== postID)
  }*/

}
