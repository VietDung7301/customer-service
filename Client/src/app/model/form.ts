export class form{
  userId : string;
  userAccount : string;
  userProblem : number;
  userEmail : string;
  orderId : string;
  problemDescription: string;
  constructor(
  userId : string,
  userAccount : string,
  userProblem : number,
  userEmail : string,
  orderId : string,
  problemDescription: string
  ){
    this.userId = userId;
    this.userAccount =userAccount;
    this.userProblem = userProblem;
    this.userEmail = userEmail;
    this.orderId = orderId;
    this.problemDescription = problemDescription

  }
}
