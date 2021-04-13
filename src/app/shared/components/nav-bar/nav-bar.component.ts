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

  signOut() {
    this.authService.logOut();
    this.alertService.success('Sign out was successfull.', '', 2000, true);
  }
}
