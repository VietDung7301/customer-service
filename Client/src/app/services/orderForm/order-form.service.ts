import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  private REST_API = 'http://103.179.173.95:8081/api/listOrderByUser/2';
  private REST_API_POST_DATA ='http://localhost:8000/user/complain'
  private httpOption ={
    headers :new HttpHeaders({
      'contentType' : 'application/json'
    })
  }
  constructor(
    private https : HttpClient) {}

  public getOrder() : Observable<any> {
     const url = `${this.REST_API}`;
     return this.https.get<any>(url,this.httpOption);

  }

  public postData(data: any) : Observable<any> {

    const url = `${this.REST_API_POST_DATA}`;
    return this.https.post<any>(url,data,this.httpOption);

 }

}
