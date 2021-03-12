import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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


  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
