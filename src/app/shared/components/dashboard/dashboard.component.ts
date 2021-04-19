import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { AlertService } from '../../services/alert.service';
import { BlogService, GoToEnum } from '../../services/blog.service';

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
  filter: 'all' | 'published' | 'draft' = 'all';

  @Output() onEdit: EventEmitter<Post> = new EventEmitter<Post>();

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

  onFilterChange(filter: 'all' | 'published' | 'draft') {
    this.filter = filter;
    this.getPosts(this.pageSize, (this.page * this.pageSize) - this.pageSize, this.filter);
  }

  editPost(post: Post) {
    this.onEdit.emit(post);
    this.blogService.goToPosts$.next(GoToEnum.NEW_POST);
  }

  deletePost(post: Post) {
    this.blogService.deletePost(post._id).subscribe(res => {
      const index = this.data.posts.indexOf(post)
      if (index > -1) {
        this.data.posts.splice(index, 1);
        this.data.total -= 1;
        this.alertService.success("Post deleted successfully.", "", 2000, true);
      }
    }, error => {
      this.alertService.error("Faild to delete post.", "", 3000, true);
      console.log(error);
    });
  }

  private getPosts(limit: number, offset: number, status: 'all' | 'published' | 'draft') {
    this.blogService.getPostsPaginaged({ limit: limit, offset: offset, status: status }).subscribe(res => {
      this.data = res;
      console.log(this.data);
    }, err => {
      this.alertService.error("Somthing happend", err?.error?.message, 3000, true);
      console.log(err?.error);
    })
  }
}
