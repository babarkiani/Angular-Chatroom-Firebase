import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {AlertType} from './../../enums/alert-type.enum';
import {Alert} from './../../classes/alert';
import {AlertService} from './../../services/alert/alert.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy {
  public signupForm : FormGroup;
  private subscriptions: Subscription[] = [];
  // user = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   photoUrl: 'gs://chat-b22c2.appspot.com/default-profile-pic.jpg'
  // }
  constructor( private auth: AuthService,
              private api: ApiService,
              private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService,
              private loadingService: LoadingService ) {
    this.createForm();
   }

  ngOnInit() {
  }

    private createForm(): void {
          this.signupForm = this.fb.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
})

    }

    // SignUp Submit
    submit() {

     if(this.signupForm.valid) {
      this.loadingService.isLoading.next(true);
        let user = this.signupForm.value;
        user.photoUrl='https://firebasestorage.googleapis.com/v0/b/chat-b22c2.appspot.com/o/default-profile-pic.jpg?alt=media&token=6bc09dcb-8844-44f7-a5b7-133997238317';
        user.quote = 'Life is a box of chocolates, you never know what you gonna get';
        user.bio = 'Bio is under construction....';
        this.auth.signup(user.email,user.password).then(res => {
        this.api.createUser(res.user.uid,user).then(resp => {
          console.log(resp);
          if(res) {
            this.auth.saveToken(res.user.uid);
            // localStorage.setItem('email', res.user.email);
            this.router.navigate(['/chat']);
          } else {
            let failedSignupAlert = new Alert ('There was a problem signing up, try again', AlertType.Danger);
            this.alertService.alerts.next(failedSignupAlert);
          }
          this.loadingService.isLoading.next(false);
        })
      })

      } else {
          let failedSignupAlert = new Alert('Please enter valid name,email and password, Try again!', AlertType.Danger);
            this.loadingService.isLoading.next(false);
            this.alertService.alerts.next(failedSignupAlert);
        }
    }

    ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }


}
