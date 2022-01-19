// Angular dependencies
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Servicess and models
import { ImageInput, Post, PostService } from '../services/post.service';

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

  constructor(private postService: PostService, private router: Router) {

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

    // Reset picture inputs
    this.newPicUrl = '';
    this.newPicAlt = '';
  }

  // Remove picture
  removePicture(url: string): void {
    this.pictures = this.pictures.filter(pic => pic.url !== url)
  }

  // Create post
  async createPost(images: ImageInput[], content: string): Promise<void> {
    this.postService.createPost(images, content)
    .subscribe(async ({ data }) => {
      // redirect to feed page
      document.location.href = '/tabs/tab1';
    }, (error) => {      
      console.log('there was an error sending the query', error);
    });
  }

}
