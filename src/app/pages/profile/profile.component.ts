import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/app/interfaces/user';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

currentUser: any;
user;

  constructor(private auth: AuthService, private api: ApiService) { }

  ngOnInit() {

    this.currentUser = localStorage.getItem('uid');
    this.api.getUserWithId(localStorage.getItem('uid')).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe(res => {
          this.user = res;
        console.log(res)
      });
  }

}
