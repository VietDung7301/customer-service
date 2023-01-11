import { element } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  // baseUrl = 'http://localhost:3000/rates-list';
  baseUrl = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  getAllListRates() {
    const res = this.http.get<any>(this.baseUrl + '/sp07/product/rating').toPromise();
    return res;
  }

  sendProductRate(data: any) {
    return this.http.post<any[]>(this.baseUrl + '/product/rating', data);
    // return this.http.post<any[]>(this.baseUrl, data, httpOptions);
  }

  updateProductRate(id: any, data: any) {
    return this.http.put<any[]>(`${this.baseUrl}/${id}`, data);
  }

  uploadImage(body: any): Observable<any> {
    let ob = this.http.post(`http://localhost:3000/files`, body);
    return ob;
  }
}
