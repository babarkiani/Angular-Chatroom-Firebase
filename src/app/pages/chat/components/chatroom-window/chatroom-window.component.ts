import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  chatroom;
  changeChatroom;
  selectedChatroom;
  selectChatroomMessages;
  messages;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let chatroomId = params.get('chatroomId');
      this.selectedChatroom =
      this.api.changeChatroom(chatroomId).subscribe( res => {
        this.chatroom = res;

        this.selectChatroomMessages =
        this.api.ChatroomMessages(chatroomId).subscribe( res => {
          this.messages = res;
        console.log(this.messages);
      })
    })
    })
  }
  ngAfterViewChecked() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }


}
