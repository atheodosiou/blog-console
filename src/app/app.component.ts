import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertConfig, AlertService } from './shared/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'blog-console';

  alerts: AlertConfig[] = [];
  alertServiceSubscription: Subscription;

  constructor(private alertService: AlertService) {
    this.alertServiceSubscription = this.alertService.onShow.subscribe(alerts => {
      this.alerts = alerts;
      console.log(alerts)
    })
  }

  ngOnDestroy() {
    this.alerts = [];
    this.alertServiceSubscription.unsubscribe();
  }
}
