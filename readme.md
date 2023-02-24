# Customer service
## 1. Project description
Project này là 1 module của hệ thống bán hàng "LTCT" với 2 mục đích chính là "Đánh giá sản phẩm" và "Xử lý khiếu nại".
Cụ thể như sau
#### Đánh giá sản phẩm
Sau khi mua hàng thành công, người dùng được phép đánh giá sản phẩm (Số sao và đánh giá chi tiết). Đánh giá của người dùng sẽ được ghi lại và hiển thị cùng với sản phẩm
#### Xử lý khiếu nại
Cho phép người dùng gửi khiếu nại đến hệ thống. Cùng với đó là cung cấp các chức năng cho phép nhân viên xử lý khiếu nại và phản hồi lại cho người dùng
## 2. Installation
### Yêu cầu
Cài đặt nodeJs version 16.14.2 (Nếu sử dụng node khác có thể xảy ra tình trạng không tương thích phiên bản
### Các bước tiến hành
#### Cài MongoDB
Project này sử dụng mongoDB để lưu dữ liệu phía backend. Truy cập vào đường link [install mongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) để xem cách cài đặt chi tiết (nếu dùng linux thì click vào nút "install on Linux" cũng có hướng dẫn chi tiết
#### Cài đặt server
Chuyển đường dẫn về server, sau đó chạy lệnh instal như dưới đây:
```shell
cd server
npm install
npm i nodemon
```
#### Cài đặt client
Chuyển đường dẫn về client, chạy lệnh install như dưới đây (khi chạy lệnh install mất thời gian khá lâu, khoảng 5p)
```shell
cd client
npm install
```

## 3. How to use
Bước cài đặt ở phía trên chỉ cần thực hiện 1 lần, sau đó mỗi lần chạy project chỉ cần thực hiện cách lệnh sau đây
#### Khởi động server
```shell
cd server
npm run dev
```
Bước này sẽ khởi động server ở port 8000. Nếu port 8000 đã có app khác sử dụng, hệ thống sẽ báo lỗi
#### Khởi động client
```shell
cd client
npm start
```
Bước này sẽ khởi động client ở port 4200. Nếu port 4200 đã có app khác sử dụng, hệ thống sẽ hỏi bạn có muốn đổi sang port khác không, nhấn 'y' để đống ý
#### Truy cập client
Mở trình duyệt và gõ đường link [localhost:4200](localhost:4200) để truy cập và sử dụng

## 4. How to modify, reuse
#### Cách thêm mới 1 trang:
Thực hiện với ví dụ tạo 1 trang helloworld
##### 1. Viết mã nguồn trang
Tạo mới 3 file `helloworld.component.html`, `helloworld.component.ts`, `helloworld.component.css`

Thêm code vào file `helloworld.component.html`
```shell
<h1>hello world</h1>
```
##### 2. Tạo component
Thêm code vào file 'helloworld.component.ts`
```shell
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.css']
})
export class HelloWorldComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {
  }
}
```
##### 3. Import component vừa tạo
Import component vừa tạo vào `Client\src\app\app-routing.module.ts` và `Client\src\app\app.module.ts`
		
#25/01/2023 (Mùng 4 Tết)
Cầu chúc cho tất cả mọi người một năm bình an!
