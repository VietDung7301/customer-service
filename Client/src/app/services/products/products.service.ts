import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'http://localhost:3000/products-list';
  constructor(private http: HttpClient) {}

  getAllProductsList() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getProductById(productId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${productId}`);
  }
}
