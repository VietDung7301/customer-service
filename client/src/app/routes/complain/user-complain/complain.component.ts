import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderFormService } from 'src/app/services/orderForm/order-form.service';
import { UserService } from '../../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class UserComplainComponent implements OnInit{
  userInfor: any;
  userId: any;
  inputUserName: any;
  orders : any;
  display = false;
  displayOrder = false;
  displayInputId = false;
  displayPopUpSucc = false;
  displayPopUpFail = false;
  complainForm = new FormGroup({
    userProblem : new FormControl(''),
    userAccount: new FormControl(''),
    userEmail : new FormControl(''),
    orderId : new FormControl(''),
    problemDescription : new FormControl('')
  })
  btnIdOrder : any;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private orderService : OrderFormService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = '2';
    });
    // lay du lieu tu api don hang
    this.orderService.getOrder().subscribe((data) =>{
       console.log('du lieu tra ve', data);
       this.orders = data;
    })

    this.fetchData();
    this.initForm();
  }

  async fetchData() {
    // Đăng nhập vào module user để lấy token
    await this.login();
    console.log("local email", localStorage.getItem('userEmail'));
    this.userInfor = {
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName')
    }
    console.log("userInfor email", this.userInfor.email);
  }

  async login(): Promise<void> {
    const response = await this.userService.login()
  }

  initForm() {
    console.log('userId', this.userId);
  }
// Hien thi modal
  displayModal(){
    this.display = ! this.display;
    console.log('du lieu luu vao bien' + this.orders);
    // console.log("haha")
  }
  // Hien thi phan chon don hang
  public showOrder(){
    // console.log(this.selectValue);
    // console.log(typeof this.selectValue);
    if(this.complainForm.value.userProblem ==="1" || this.complainForm.value.userProblem === "2" || this.complainForm.value.userProblem ==="3"){
          this.displayOrder = true;
    }
    if(this.complainForm.value.userProblem === "4" || this.complainForm.value.userProblem ==="5" ){
      this.displayOrder = false;
    }
  }


  public getOrderId(myBtn : HTMLButtonElement){
    const value = myBtn.value;
     this.complainForm.patchValue({orderId : value});
     this.display = false;
     this.displayInputId = true;
  }

  public submitForm(){
        const data =  {
          userId : this.userId,
          userAccount : this.complainForm.value.userAccount?this.complainForm.value.userAccount:this.userInfor.name,
          userProblem : this.complainForm.value.userProblem,
          userEmail : this.complainForm.value.userEmail?this.complainForm.value.userEmail:this.userInfor.email,
          orderId : this.complainForm.value.orderId,
          problemDescription : this.complainForm.value.problemDescription,
        }

        console.log(data);

        this.orderService.postData(data).subscribe((res) =>{
          console.log('du lieu tra ve', res);
          this.popUpShow(res);
       })
  }

  public popUpShow(res : any){
    if(res.success == true){
      this.displayPopUpSucc = true;
    }else{
      this.displayPopUpFail = true;
    }
  }
  public reloadPage(){
    location.reload();
  }
}
