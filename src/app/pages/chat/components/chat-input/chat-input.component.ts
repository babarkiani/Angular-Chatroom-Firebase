import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

    public newMessageText: string = '';
   user;
   uid;
  constructor(private api: ApiService, private auth: AuthService) {
    this.uid = localStorage.getItem('uid');
     this.api.getUser(this.uid).subscribe(res => {
      console.log(res);
      this.user = res;
    });
   }

  ngOnInit() {
  }

  public submit(message) {
    // Save text to Firebase backend
    // console.log('New Message: ' , message);



    this.api.createMessage(message,this.user).then(res => {
      if(res) {
        console.log('success' + res);
      } else{
        console.log('error');
      }
    }).catch(err => {
      console.log('this is catch error'+err);
    });

    // reset Input
    this.newMessageText = '';

  }

}
