import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/upload/images`, formData, { observe: 'events', reportProgress: true });
  }
}
