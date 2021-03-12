import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.logOut();
    this.alertService.success('Sign out was successfull.', '', 2000, true);
  }
}
