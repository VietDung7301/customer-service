import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = `${environment.apiURL}/user/complain`;

  constructor(private http: HttpClient) {}


  getListRequestFromAPI() {
    return this.http.get<Request[]>(this.baseUrl);
  }
  getComplainFromAPI(id: any) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  async getListRequest() {
    var listData: any;
    await this.getListRequestFromAPI()
      .toPromise()
      .then((result) => {
        listData = result;
      });
    return listData;
  }
  async getComplainById(id: any) {
    var data: any;
    await this.getComplainFromAPI(id)
      .toPromise()
      .then((result) => {
        data = result;
      });
    return data;
  }

  updateRequest(id: any, payload: any) {
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  sendComment(id: any, comment: string) {
    let payload = {
      staffId: localStorage.getItem('userId'), 
      staffName: localStorage.getItem('userName'),
      content: comment, 
      staffImageUrl: null
    }
    return this.http.post<any>(`${this.baseUrl}/reply/${id}`, payload);
  }
}
