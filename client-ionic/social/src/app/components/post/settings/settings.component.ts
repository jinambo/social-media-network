import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @Input() postId;
  @Input() posts: Post[];
  @Output() getPostsChange = new EventEmitter<Post[]>();

  constructor(
    public popoverController: PopoverController,
    private postService: PostService
  ) { }

  ngOnInit() {
    console.log(this.postId)
  }

  // Client side handle
  removePostClient() {
    this.posts = this.posts.filter(post => post.id !== this.postId)
    this.getPostsChange.emit(this.posts)
  }

  // Send request - server side handle
  removePost() {
    this.postService.removePost(this.postId)
    .subscribe(({ data }) => {
      console.log('post removed', data);
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }

  async close() {
    await this.popoverController.dismiss();
  }

}
