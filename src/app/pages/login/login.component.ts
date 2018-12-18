import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';

import {AlertType} from './../../enums/alert-type.enum';
import {Alert} from './../../classes/alert';
import {AlertService} from './../../services/alert/alert.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

 public loginForm : FormGroup;
private subscriptions: Subscription[] = [];
private returnUrl: string;
  constructor(private fb: FormBuilder, private alertService: AlertService,
              private loadingService: LoadingService, private auth: AuthService,
              private router: Router, private route: ActivatedRoute,
              private api: ApiService ) {
    this.createForm();
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

    private createForm(): void {
          this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
})

    }

    // Login Submit
   submit() {

      if(this.loginForm.valid) {
        this.loadingService.isLoading.next(true);
        let {email,password} = this.loginForm.value;

          this.auth.login(email,password).then(res => {
            this.api.getUser(res.user.uid).subscribe(resp => {
              if(resp){
                this.auth.saveToken(res.user.uid);
                this.router.navigateByUrl(this.returnUrl);
              } else{
                this.loadingService.isLoading.next(false);
                let failedLoginAlert = new Alert('Invalid Email/Password combination, Try Again!', AlertType.Danger);
                this.alertService.alerts.next(failedLoginAlert);

              }

            })

          })

      } else {
        let failedLoginAlert = new Alert('Your Email/Password were invalid, Try Again!', AlertType.Danger);
          this.loadingService.isLoading.next(false);
          this.alertService.alerts.next(failedLoginAlert);
      }

    }

ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

}
