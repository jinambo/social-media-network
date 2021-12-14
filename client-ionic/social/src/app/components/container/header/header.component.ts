import { Component, Input, OnInit } from '@angular/core';
import { USER_NAME } from 'src/app/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title : String;
  
  username: String = "";

  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem(USER_NAME)
  }

}
