import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  private REST_API = environment.orderAPI;
  private REST_API_POST_DATA ='http://localhost:8000/user/complain'
  private httpOption ={
    headers :new HttpHeaders({
      'contentType' : 'application/json'
    })
  }
  constructor(private http: HttpClient) {}

  public getOrder() : Observable<any> {
     const url = `${this.REST_API}`;
     return this.http.get<any>(url);

  }

  public postData(data: any) : Observable<any> {

    const url = `${this.REST_API_POST_DATA}`;
    return this.http.post<any>(url,data);

 }

}
