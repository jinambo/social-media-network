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

  // Rewrite creation date to the human readeble format
  handleDate = theDate => {
    let date = new Date(theDate);

    return `${date.getDay() + 1}. ${date.getMonth() + 1}. ${date.getFullYear()}`
  }

  toggleLike(postID) {
    this.postService.toggleLike(postID)
    .subscribe(({ data }) => {
      console.log('like toggled', data);
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
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

  async initCommentsModal(postName, postID, comments) {
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      componentProps: {
        'postName': postName,
        'postID': postID,
        'comments': comments
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
      }
    });

    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingsComponent,
      cssClass: 'post-settings',
      event: ev
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
