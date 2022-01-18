import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LikeModule } from '../like/like.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    LikeModule,
    IonicModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
