import { Component, OnInit } from '@angular/core';
import {ApiService} from './../../../../services/api/api.service';
import {Observable} from 'rxjs'
@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

//chatrooms: Observable<any>;
//chatrooms: any[]=[];
chatrooms;
  constructor(
            private api: ApiService,
  ) {
 // this.chatrooms = this.api.chatRoom();
  this.api.chatRoom().subscribe(res => {
    console.log(res);
    this.chatrooms = res;
  })
  }

  ngOnInit() {

  }

}
