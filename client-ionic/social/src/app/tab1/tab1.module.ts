import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HeaderModule } from '../components/container/header/header.module';
import { LikeModule } from '../components/post/like/like.module';
import { CardModule } from '../components/post/card/card.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HeaderModule,
    LikeModule,
    CardModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
