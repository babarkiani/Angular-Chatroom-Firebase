import { Component, OnInit, OnDestroy } from '@angular/core';
import {Alert} from './classes/alert';
import { AlertService } from './services/alert/alert.service';
import { LoadingService } from './services/loading/loading.service';
import { Subscription, ObjectUnsubscribedError } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: boolean = false;
  constructor( private alertService: AlertService, private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscription.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
       })
    )

    this.subscription.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )

  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
