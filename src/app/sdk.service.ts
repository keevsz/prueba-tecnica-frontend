import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SdkService {
  private clientServerApiUrl = 'http://localhost:3001';
  private securityServerApiUrl = 'http://localhost:3003';

  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    return this.http.get(`${this.securityServerApiUrl}/token`);
  }

  registerClient(formData: any): Observable<any> {
    return this.http.post(`${this.clientServerApiUrl}/clients`, formData);
  }
}
