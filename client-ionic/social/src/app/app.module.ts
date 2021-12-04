import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {ApolloClient, InMemoryCache} from '@apollo/client/core';
import {Apollo, gql} from 'apollo-angular';

import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AUTH_TOKEN } from './consts';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    /*
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    */
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:5000',
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
          }),
        };
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}