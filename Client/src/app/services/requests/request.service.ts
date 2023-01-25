import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = `${environment.apiURL}/requests-list`;

  constructor(private http: HttpClient) {}

  getListRequestFromAPI() {
    return this.http.get<Request[]>(this.baseUrl);
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

  updateRequest(id: any, payload: any) {
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }
}
