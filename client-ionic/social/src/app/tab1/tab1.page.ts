// Angular dependecies
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

// Services and models
import { Post, PostService } from '../services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  modalDataResponse: any;
  posts: Post[];     

  constructor(
    public modalController: ModalController,
    public popoverController: PopoverController,
    private postService: PostService) {
    
  }

  async doRefresh(event) {
    console.log('Begin async operation'); 
    document.location.href = '/tabs/tab1';
  
    await event.target.complete();
  }

  ngOnInit(): void {
     // Get posts from DB on load
     this.postService.getPosts()
     .subscribe(async ({ data, loading }) => {
       this.posts = data.getPosts;
     });
  }

  ngOnDestroy(): void {
    // this.querySubscription.unsubscribe();
  }
}
