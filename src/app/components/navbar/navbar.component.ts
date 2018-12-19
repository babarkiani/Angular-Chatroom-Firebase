import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

currentUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('uid');
  }

    // public logout() {
    //   this.authService.logout();
    // }
}
