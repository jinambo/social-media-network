// Angular dependencies
import { Component, Input, OnInit } from '@angular/core';

// Modals
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

// Models
import { Comment, Image, Post } from 'src/app/services/post.service';

// Components
import { SettingsComponent } from '../settings/settings.component'; 
import { CommentsPage } from 'src/app/modals/comments/comments.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  modalDataResponse: any;

  // Input properties
  @Input() posts: Post[];
  @Input() username: string;
  @Input() postId: string;
  @Input() postCreationDate: string;
  @Input() postImages: Image[];
  @Input() postContent: string;
  @Input() postLikes: any[];
  @Input() postLikesCount: number;
  @Input() postComments: Comment[];
  @Input() postCommentsCount: number;

  constructor(public modalCtrl: ModalController,
    public popoverController: PopoverController) { }

  ngOnInit(): void {}

  // Rewrite creation date to the human readeble format
  handleDate(theDate: string): string {
    let date = new Date(theDate);

    return `${date.getDay() + 1}. ${date.getMonth() + 1}. ${date.getFullYear()}`
  }

  // Comment modal
  async initCommentsModal(postName: string, postID: string, comments: string, commentsCount: number): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      componentProps: {
        postName,
        postID,
        comments,
        commentsCount
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        
        // Re-set comments and it's count according to response
        this.postComments = modalDataResponse.data.comments;
        this.postCommentsCount = modalDataResponse.data.commentsCount;
      }
    });

    return await modal.present();
  }

  // Post settings popover
  async presentPopover(ev: any, postID: String): Promise<any> {
    const popover = await this.popoverController.create({
      component: SettingsComponent,
      componentProps: { postId: postID, posts: this.posts },
      cssClass: 'post-settings',
      event: ev
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
