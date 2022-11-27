import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = 'http://localhost:3000/orders-list';
  constructor(private http: HttpClient) {}

  getAllOrdersList(userId: string) {
    return this.http.get(this.baseUrl);
  }

  getOrderById(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }
}
