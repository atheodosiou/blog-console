import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // public login(data: { email: string, password: string }): Observable<any> {
  //   return this.http.post<any>(`${environment.serverUrl}/auth/login`, data);
  // }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/auth/login`, { email, password }, { observe: 'response' }).pipe(
      tap((res: HttpResponse<any>) => {
        localStorage.setItem('currentUser', JSON.stringify(res.body.user));
        localStorage.setItem('X-Access-Token', res.headers.get('X-Access-Token'));
        // this.currentUserSubject.next(res.body.user);
      }),
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }
}
