import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Media } from '../models/media.model';
import { Post } from '../models/post.model';
import { AlertService } from './alert.service';

export enum GoToEnum {
  DASHBOARD = 'dashboard',
  NEW_POST = 'new_post'
}
export class PostStats {
  totalPublished: number;
  totalDraft: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  private goToPosts: Subject<GoToEnum> = new Subject<GoToEnum>();

  public get goToPosts$() {
    return this.goToPosts;
  }

  public getPostStatistics(): Observable<PostStats> {
    return this.http.get<PostStats>(`${environment.serverUrl}/posts/stats`).pipe(
      catchError(this.handleError)
    );
  }

  public getPostsPaginaged(pagination: { limit: number, offset: number, status?: 'all' | 'published' | 'draft' }): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/posts/paginated`, pagination, {
      headers: new HttpHeaders({
        'xapikey': environment.apiKey
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public addPost(data: Post): Observable<any> {
    return this.http.post<Post>(`${environment.serverUrl}/posts`, data).pipe(
      catchError(this.handleError)
    );
  }

  public updatePost(data: Post): Observable<any> {
    return this.http.patch<Post>(`${environment.serverUrl}/posts/${data._id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  public deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${environment.serverUrl}/posts/${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  public getAllImages(): Observable<{ media: Media[] }> {
    return this.http.get<{ media: Media[] }>(`${environment.serverUrl}/media/images`).pipe(
      catchError(this.handleError)
    );
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.serverUrl}/categories`).pipe(
      catchError(this.handleError)
    );
  }

  public addCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${environment.serverUrl}/categories`, { category: name }).pipe(
      catchError(this.handleError)
    );
  }

  public removeImageFile(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.serverUrl}/media/images/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
