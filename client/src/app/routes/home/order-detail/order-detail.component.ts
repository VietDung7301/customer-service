import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePickerService } from 'ng-zorro-antd/date-picker/date-picker.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Rate } from 'src/app/model/rate';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { RatesService } from 'src/app/services/rater/rates.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
@Component({
  selector: 'app-product-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [DatePipe]
})
export class ProductDetailComponent implements OnInit {
  allOrderList: any[] = [];
  currentRateOrder: any;
  currentProduct: any;
  currentProductRate: any;
  currentProductStarRate: number = 0;
  currentProductMessageRate: string = '';
  orderId: any;
  isVisibleDrawer: boolean = false;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  disabledForm: boolean = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  constructor(
    public route: ActivatedRoute,
    private ordersService: OrdersService,
    private message: NzMessageService,

    private ratesService: RatesService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');


    this.allOrderList = await this.ordersService.getAllOrdersList('test');

    console.log('allOrderList', this.allOrderList);
    this.currentRateOrder = this.allOrderList.find(
      (order) => order.orderId == this.orderId
    );
    if (this.currentRateOrder.products.length == 1) {
      this.openDrawer(this.currentRateOrder.products[0]);
    }
  }


  async openDrawer(product: any) {
    this.currentProductRate = null;
    this.isVisibleDrawer = true;
    this.currentProduct = product;
    this.currentProductRate = await this.getDetailProductRate(
      this.orderId,
      product.productId
    );
    if (this.currentProductRate != null) {
      this.currentProductStarRate = this.currentProductRate.starNumbers;
      this.currentProductMessageRate = this.currentProductRate.message;
      this.disabledForm = true;
    }
  }

  closeDrawer(): void {
    this.isVisibleDrawer = false;
  }

  sendProductRate(orderId: string, productId: string) {
    if (!this.disabledForm) {
      if (this.currentProductStarRate != 0) {
        const newRate: Rate = new Rate(

          this.currentProductMessageRate,
          orderId,
          productId,
          this.currentProductStarRate,
          this.currentProduct.productName,
          this.currentProduct.productImageUrl
        );
        console.log('current productRate' ,this.currentProduct);
        this.ratesService.sendProductRate(newRate).subscribe((response) => {
          this.createMessage('success', 'Đánh giá đã được gửi đi thành công');
          console.log('success');
          this.closeDrawer();
        });
      } else {
        this.createMessage('error', 'Vui lòng đánh giá số sao của sản phẩm');
      }
    }
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  async getDetailProductRate(orderId: string, productId: string) {
    var thisDetailVote = null;
    // var allRates = await this.ratesService.getAllListRates().toPromise();
    var  allRates = await this.ratesService.getAllListRates();
    // var  allRates = res;
    allRates.forEach((element:any) => {
      if (element.orderId == orderId && element.productId == productId) {
        thisDetailVote = element;
      }
    });
    console.log('this DetailVote', thisDetailVote);
    return thisDetailVote;
  }
}
