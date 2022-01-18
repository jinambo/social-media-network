import { Component } from '@angular/core';
import { ImageInput, PostService } from '../services/post.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  newPicUrl: string = '';
  newPicAlt: string = '';
  newPost: string = '';

  pictures: ImageInput[] = [];

  constructor(private postService: PostService) {

  }

  addPicture(url: string, alt: string): void {
    let picture: ImageInput = {
      url: url,
      alt: alt
    };

    // If picture with same url doesn't exist
    if (this.pictures.filter(pic => pic.url === url).length == 0) {
      this.pictures.push(picture)  
    }

    this.newPicUrl = '';
    this.newPicAlt = '';

    console.log(this.pictures)
  }

  removePicture(url: string): void {
    this.pictures = this.pictures.filter(pic => pic.url !== url)
    console.log(this.pictures)
  }

  createPost(images: ImageInput[], content: string): void {
    this.postService.createPost(images, content)
    .subscribe(({ data }) => {
      console.log('post created', data);
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }

}
