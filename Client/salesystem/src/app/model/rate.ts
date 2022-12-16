export class Rate {
  orderId: string;
  productId: string;
  starNumbers: number;
  message: string;

  constructor(
    orderId: string,
    productId: string,
    starNumbers: number,
    message: string
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.starNumbers = starNumbers;
    this.message = message;
  }
}
