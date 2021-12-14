import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LikeModule } from '../like/like.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    LikeModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
