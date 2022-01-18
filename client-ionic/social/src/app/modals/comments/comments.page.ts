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
  @Input() commentsCount: number;
  
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
    // Return updated data on close
    const modalResponse: Object = {
      comments: this.comments,
      commentsCount: this.commentsCount
    };

    await this.modalCtr.dismiss(modalResponse);
  }

  createComment(postID) {
    if (this.newComment !== '' || this.newComment != null) {
      this.postService.createComment(postID, this.newComment)
      .subscribe(({ data }) => {
        console.log('comment added', data);

        // Add comment to the local array
        this.comments = data.createComment.comments
        this.commentsCount++;
        
      }, (error) => {      
        console.log('there was an error sending the query', error);
      });
    }
  }

  removeComment(postID, commentID) {
    this.postService.removeComment(postID, commentID)
    .subscribe(({ data }) => {
      console.log('comment removed', data);

        // Remove comment from the local array
        this.comments = data.removeComment.comments
        this.commentsCount--;
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }
}
