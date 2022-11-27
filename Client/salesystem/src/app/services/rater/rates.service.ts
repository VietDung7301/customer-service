import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  baseUrl = 'http://localhost:3000/rates-list';

  constructor(private http: HttpClient) {}

  getAllListRates() {
    return this.http.get<any[]>(this.baseUrl);
  }

  async getDetailProductRate(orderId: string, productId: string) {
    var thisDetailVote = null;
    var response = await this.getAllListRates().toPromise();
    var allRates = response;
    console.log(allRates);
    allRates.forEach((element) => {
      // Object.keys(allRates).forEach((element) => {
      if (element.orderId == orderId && element.productId == productId) {
        thisDetailVote = element;
      }
      console.log(element.type);
    });
    return thisDetailVote;
  }
}
