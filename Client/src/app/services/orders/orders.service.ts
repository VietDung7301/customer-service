import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = `${environment.orderAPI}`;
  constructor(private http: HttpClient) {}

  getAllOrdersListFromAPI(userId: string) {
    return this.http.get<any[]>(this.baseUrl);
  }
  async getAllOrdersList(userId: string) {
    var listData: any;
    await this.getAllOrdersListFromAPI(userId)
      .toPromise()
      .then((result) => {
        listData = result;
        listData!.forEach((e: any) => {
          // e.id = e.orderId;
          e.orderTime = e.order_time;
          e.status = "Đã giao hàng";
          e.products.forEach((item : any)=>{
            item.productImageUrl = item.img;
            item.description = item.size;
          })
          // delete e.orderId;
        });
      });
    return listData;
  }

  getOrderById(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }
}
