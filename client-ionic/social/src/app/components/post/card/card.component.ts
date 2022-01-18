import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CommentsPage } from 'src/app/modals/comments/comments.page';
import { SettingsComponent } from '../settings/settings.component'; 

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  modalDataResponse: any;

  // Input properties
  @Input() posts;
  @Input() username;
  @Input() postId;
  @Input() postCreationDate;
  @Input() postImages;
  @Input() postContent;
  @Input() postLikes;
  @Input() postLikesCount;
  @Input() postComments;
  @Input() postCommentsCount;

  constructor(public modalCtrl: ModalController,
    public popoverController: PopoverController) { }

  ngOnInit() {}


  // Rewrite creation date to the human readeble format
  handleDate = theDate => {
    let date = new Date(theDate);

    return `${date.getDay() + 1}. ${date.getMonth() + 1}. ${date.getFullYear()}`
  }

  // Comment modal
  async initCommentsModal(postName, postID, comments, commentsCount) {
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
        //console.log(modalDataResponse.data);
        // Re-set comments and it's count according to response
        this.postComments = modalDataResponse.data.comments;
        this.postCommentsCount = modalDataResponse.data.commentsCount;
      }
    });

    return await modal.present();
  }

  // Post settings popover
  async presentPopover(ev: any, postID: String) {
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
