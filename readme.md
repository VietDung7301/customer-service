# Customer service
## 1. Mô tả
Project này là 1 module của hệ thống bán hàng "LTCT" với 2 mục đích chính là "Đánh giá sản phẩm" và "Xử lý khiếu nại".
Cụ thể như sau
#### Đánh giá sản phẩm
Sau khi mua hàng thành công, người dùng được phép đánh giá sản phẩm (Số sao và đánh giá chi tiết). Đánh giá của người dùng sẽ được ghi lại và hiển thị cùng với sản phẩm
#### Xử lý khiếu nại
Cho phép người dùng gửi khiếu nại đến hệ thống. Cùng với đó là cung cấp các chức năng cho phép nhân viên xử lý khiếu nại và phản hồi lại cho người dùng
## 2. Cách cài đặt
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

## 3. Cách sử dụng
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

## 4. Cách chỉnh sửa, reuse
#### Thêm mới 1 trang
- Để tạo một màn mới thực hiện các bước sau:
	+ Bước 1: Mở shell (cd Client)
	+ Bước 2: Nhập lệnh: ng g c routes/<tên màn> --skip-tests (vd: ng g c routes/product-list --skip-tests)
		=> sau bước 2, thư mục product-list đã được tạo ra với 3 file: html, ts, css
		(Nếu không dùng câu lệnh thì có thể tự tạo thư mục 3 file kia bằng tay)
	+ Bước 3: Thêm đường dẫn của màn hình vừa tạo trong file app-routing.module.ts
		(Tham khảo 1 path đã có trước đấy để tạo ra 1 path mới)
		{ path: '...', component: ...}
		
#25/01/2023 (Mùng 4 Tết)
Cầu chúc cho tất cả mọi người một năm bình an!
