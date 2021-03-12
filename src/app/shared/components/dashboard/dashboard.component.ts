import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private blogService: BlogService, private alertService: AlertService) { }
  posts: any[];
  ngOnInit() {
    this.blogService.getPostsPaginaged({ limit: 10, offset: 0,status:'draft' }).subscribe(res => {
      this.posts = res.posts;
    }, err => {
      this.alertService.error("Somthing happend", err?.error?.message, 3000, true);
      console.log(err?.error);
    })
  }

}
