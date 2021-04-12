import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Media } from '../models/media.model';
import { Post } from '../models/post.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  public getPostsPaginaged(pagination: { limit: number, offset: number, status: 'published' | 'draft' }): Observable<any> {
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
