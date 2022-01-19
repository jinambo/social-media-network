import { Component, Input, OnInit } from '@angular/core';

// Capacitor dependencies
import { Storage } from '@capacitor/storage';

// Consts
import { USER_NAME } from 'src/app/consts';

// Services
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Input() postID : String;
  @Input() likes : any[];
  @Input() likesCount : number;

  liked : Boolean;

  constructor(
    private postService: PostService) { }

  async ngOnInit(): Promise<void> {
    const { value } = await Storage.get({ key: USER_NAME})

    if (this.likes.find(like => like.username === value)) {
      this.liked = true;
    }
  }


  toggleLike(postID: string): void {
    // Client side handle
    this.liked = !this.liked;
    this.liked ? this.likesCount++ : this.likesCount--;

    // Send request
    this.postService.toggleLike(postID)
    .subscribe(({ data }) => {
      console.log('like toggled', data);
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }

}
