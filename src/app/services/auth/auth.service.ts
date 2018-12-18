import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, from, } from 'rxjs';
import {AlertType} from './../../enums/alert-type.enum';
import {User} from './../../classes/user';
import {AlertService} from './../alert/alert.service';
import {Alert} from './../../classes/alert';
import { of } from 'rxjs';
//import 'rxjs/add/operator/switchMap';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

currentUser: boolean
authState: any = null;
  constructor(private router: Router,
              private alertService: AlertService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore
              ) {  }


   signup( email,password){

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  }

  login(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  saveToken(uid){
    localStorage.setItem('uid',uid);

   }
   getToken(){
    this.currentUser = false;
    return localStorage.getItem('uid');
   }

   logout(){
    this.currentUser = true;
    localStorage.clear();
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert ('You have been signed out!'));
  }

}
