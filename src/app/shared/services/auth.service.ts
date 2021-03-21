import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private jwtHelper = new JwtHelperService();

  get token() {
    return this.getToken();
  }


  login(email: string, password: string): Observable<{ message: string, user: User }> {
    return this.http.post(`${environment.serverUrl}/auth/login`, { email, password }, { observe: 'response' }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log("in tap")
        localStorage.setItem('currentUser', JSON.stringify(res.body.user));
        localStorage.setItem('X-Access-Token', res.headers.get('X-Access-Token'));
      }),
      map((res: HttpResponse<any>) => {
        return res.body;
      }),
      shareReplay()
    );
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  public isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  private getToken(): string {
    return localStorage.getItem('X-Access-Token');
  }
}
