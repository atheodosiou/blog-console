import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { BlogService, GoToEnum } from '../../services/blog.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService, private blogService: BlogService) { }
  @Output() onNewPostToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  showDashboard: boolean = true;

  ngOnInit() {
    this.blogService.goToPosts$.subscribe(res => {
      if (res === GoToEnum.DASHBOARD) {
        this.showDashboard = true;
      } else {
        this.showDashboard = false;
      }
    })
  }

  onClick() {
    if (this.showDashboard === true) {
      this.showDashboard = !this.showDashboard;
      this.onNewPostToggle.next(this.showDashboard);
    } else {
      this.alertService.confirmation(
        "Leave page!", "All your work will be lost. This actions is not reversible!", "Leave", "Cancel").then(result => {
          if (result.isConfirmed) {
            this.showDashboard = !this.showDashboard;
            this.onNewPostToggle.next(this.showDashboard);
          } else {
            return;
          }
        }).catch(error => { console.error(error) })
    }

  }

  signOut() {
    this.authService.logOut();
    this.alertService.success('Sign out was successfull.', '', 2000, true);
  }

}
