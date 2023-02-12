export class Rate {
  message: string;
  orderId: string;
  userId : string;
  username : string;
  productId : string;
  starNumbers: number;
  productName: string;
  productImageUrl : string;

  constructor(
  message: string,
  orderId: string,
  productId : string,
  starNumbers: number,
  productName: string,
  productImageUrl : string,

  ) {
    this.message = message;
    this.orderId = orderId;
    this.userId = '2';
    this.username = "Duc Huy";
    this.productId = productId;
    this.starNumbers = starNumbers;
    this.productName = productName;
    this.productImageUrl = productImageUrl;
  }
}
