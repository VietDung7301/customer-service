import { OrdersService } from './../../../services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  orderList: any;
  currentOrder: any;
  doneOrderList: any[] = [];
  shippingOrderList: any[] = [];
  visible = false;
  constructor(
    private message: NzMessageService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    await this.getListOrders();
    this.getOrderListStatus();
  }

  async getListOrders(): Promise<void> {
    var response = await this.ordersService
      .getAllOrdersList('test')
      .toPromise();
    this.orderList = response;
  }

  async getDetailOrder(id: string) {
    var response = await this.ordersService.getOrderById(id).toPromise();
    this.currentOrder = response;
  }

  getOrderListStatus() {
    this.orderList.forEach((order: any) => {
      if (order.status == 'done') {
        this.doneOrderList.push(order);
      } else if (order.status == 'shipping') {
        this.shippingOrderList.push(order);
      }
    });
  }

  getOrderStatusLabel(statusType: string): string {
    var statusLabel;
    switch (statusType) {
      case 'done':
        statusLabel = 'Đã giao hàng thành công';
        break;
      case 'shipping':
        statusLabel = 'Đang giao hàng';
        break;
      default:
        statusLabel = 'Đang giao hàng';
        break;
    }
    return statusLabel;
  }

  async open(orderId: string) {
    await this.getDetailOrder(orderId);
    this.visible = true;
    console.log(this.currentOrder);
  }

  close(): void {
    this.visible = false;
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }
}
