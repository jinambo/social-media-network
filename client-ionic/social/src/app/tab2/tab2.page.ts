import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  newPost: string = '';

  constructor(private postService: PostService) {

  }

  createPost(content: string) {
    this.postService.createPost(content)
    .subscribe(({ data }) => {
      console.log('post created', data);
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }

}
