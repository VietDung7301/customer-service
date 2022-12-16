import { element } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  mockupUrl = 'http://localhost:3000/rates-list';
  baseUrl = 'http://localhost:8000/product/rating';

  constructor(private http: HttpClient) {}

  getAllListRates() {
    return this.http.get<any[]>(this.baseUrl);
  }

  sendProductRate(data: any) {
    console.log('posting');
    return this.http.post<any[]>(this.baseUrl, data);
    // return this.http.post<any[]>(this.baseUrl, data, httpOptions);
  }

  uploadImage(body: any): Observable<any> {
    let ob = this.http.post(`http://localhost:3000/files`, body);
    return ob;
  }
}
