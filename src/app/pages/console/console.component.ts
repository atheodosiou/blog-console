import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlogService, GoToEnum } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  loggedIn: boolean = false;
  showDashboard: boolean = true;
  selectedPost: Post;

  constructor(private authService: AuthService, private blogService: BlogService) {
    this.blogService.goToPosts$.subscribe(res => {
      switch (res) {
        case GoToEnum.DASHBOARD: { this.showDashboard = true; break };
        case GoToEnum.NEW_POST: { this.showDashboard = false; break };
        default: { break; }
      }
    })
  }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
  }

}
