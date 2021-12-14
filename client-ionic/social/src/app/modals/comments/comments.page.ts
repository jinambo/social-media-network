import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Services
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

// Models
import { Comment } from 'src/app/services/post.service';
import { USER_NAME } from 'src/app/consts';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() postName: string;
  @Input() postID: string;
  @Input() comments: Comment[];

  newComment: string = '';
  currentUser: string;

  constructor(
    private modalCtr: ModalController,
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem(USER_NAME)
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  createComment(postID) {
    if (this.newComment !== '' || this.newComment != null) {
      this.postService.createComment(postID, this.newComment)
      .subscribe(({ data }) => {
        console.log('comment added', data);
      }, (error) => {      
        console.log('there was an error sending the query', error);
      });
    }
  }

  removeComment(postID, commentID) {
    this.postService.removeComment(postID, commentID)
    .subscribe(({ data }) => {
      console.log('comment removed', data);
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }
}
