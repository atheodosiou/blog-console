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
  data: { limit: number, offset: number, total: number, posts: any[] };
  page: number = 1;
  pageSize: number = 5;
  filter: 'published' | 'draft' = 'published';

  ngOnInit() {
    this.blogService.getPostsPaginaged({ limit: this.pageSize, offset: 0, status: this.filter }).subscribe(res => {
      console.log(res)
      this.data = res;
    }, err => {
      this.alertService.error("Somthing happend", err?.error?.message, 3000, true);
      console.log(err?.error);
    })
  }

  onPageChange(page) {
    if (page !== this.page) {
      this.page = page;
      this.getPosts(this.pageSize, (page * this.pageSize) - this.pageSize, this.filter);
    }
  }

  onFilterChange(filter: 'published' | 'draft') {
    this.filter = filter;
    this.getPosts(this.pageSize, (this.page * this.pageSize) - this.pageSize, this.filter);
  }

  private getPosts(limit: number, offset: number, status: 'published' | 'draft') {
    this.blogService.getPostsPaginaged({ limit: limit, offset: offset, status: status }).subscribe(res => {
      this.data = res;
    }, err => {
      this.alertService.error("Somthing happend", err?.error?.message, 3000, true);
      console.log(err?.error);
    })
  }
}