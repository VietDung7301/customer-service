import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  currentRateOrder:any;
  currentProduct:any;
  currentProductStarRate: number = 0;
  currentProductMessageRate: string = '';
  orderId: any;
  isVisibleDrawer:boolean = false;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  constructor(public route: ActivatedRoute, private ordersService: OrdersService,
    private message: NzMessageService,

    private ratesService: RatesService,
    ) { }


  ngOnInit(): void {
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');
    console.log(this.orderId);
    this.ordersService.getOrderById(this.orderId).subscribe((result)=>{
      this.currentRateOrder = result;
      console.log(this.currentRateOrder);

      // this.editResto = new FormGroup({
      //   name: new FormControl(result['name']),
      //   email: new FormControl(result['email']),
      //   address: new FormControl(result['address'])
      // })
    })
  }

  async openDrawer(productId: string) {
    // await this.getDetailOrder(orderId);
    // await this.getDetailProduct(orderId, productId);
    // var rateInfo = await this.getDetailProductRate(orderId, ).toPromise();
    this.isVisibleDrawer = true;
  }

  closeDrawer(): void {
    this.isVisibleDrawer = false;
  }

  sendProductRate(orderId: string, productId: string) {
    if (this.currentProductStarRate != 0) {
      const newRate: Rate = new Rate(
        orderId,
        productId,
        this.currentProductStarRate,
        this.currentProductMessageRate
      );
      this.ratesService.sendProductRate(newRate).subscribe((response) => {
        this.createMessage('success', 'Đánh giá đã được gửi đi thành công');
        console.log('success');
        this.closeDrawer();
      });
    } else {
      this.createMessage('error', 'Vui lòng đánh giá số sao của sản phẩm');
    }
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
