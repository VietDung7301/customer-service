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
  // baseUrl = `${environment.apiURL}/rates-list`;
  postRateAPI = `${environment.apiURL}/product/rating`;
  getRateAPI = `${environment.apiURL}/sp07/product/rating`;
  complainAPI = `${environment.apiURL}/user/complain`;

  constructor(private http: HttpClient) {}

  getAllListRates() {
    const res = this.http.get<any>(this.getRateAPI).toPromise();
    return res;
  }

  sendProductRate(data: any) {
    console.log('posting');
    return this.http.post<any[]>(this.postRateAPI, data);
    // return this.http.post<any[]>(this.baseUrl, data, httpOptions);
  }

  updateProductRate(id: any, data: any) {
    let sendData = {
      userId: data.userId,
      userAccount: data.userName,
      userProblem: data.userProblem,
      orderId: data.orderId,
      problemDescription: data.message,
      rateId: id
    }
    return this.http.post<any[]>(`${this.complainAPI}`, sendData);
  }

  uploadImage(body: any): Observable<any> {
    let ob = this.http.post(`http://localhost:3000/files`, body);
    return ob;
  }
}
