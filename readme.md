# LTCT-Customer Service
## Yêu cầu
Cài đặt nodeJs version 16.14.2 (Nếu sử dụng node khác có thể xảy ra tình trạng không tương thích phiên bản
## Cách chạy project
#### 1. Khởi động server
```shell
cd Server
npm install
npm run dev
```
Bước này có thể bị lỗi vì chưa cài đặt nodemon, chạy lệnh sau để cài đặt nodemon:
```shell
npm i nodemon
```
#### 2. Khởi động client
```shell
cd Client
npm install
npm start
```

## Khi muốn thêm 1 tab mới
- Tất cả các màn hình giao diện được lưu trong Client/src/app/routes/home (vd: Client/src/app/routes/home/dashboard)
- Để tạo một màn mới thực hiện các bước sau:
	+ Bước 1: Mở shell (cd Client)
	+ Bước 2: Nhập lệnh: ng g c routes/<tên màn> --skip-tests (vd: ng g c routes/product-list --skip-tests)
		=> sau bước 2, thư mục product-list đã được tạo ra với 3 file: html, ts, css
		(Nếu không dùng câu lệnh thì có thể tự tạo thư mục 3 file kia bằng tay)
	+ Bước 3: Thêm đường dẫn của màn hình vừa tạo trong file app-routing.module.ts
		(Tham khảo 1 path đã có trước đấy để tạo ra 1 path mới)
		(chỉ 1 dòng
			 { path: '...', component: ...} thôi,
		không khó đâu)
#25/01/2023 (Mùng 4 Tết)
Cầu chúc cho tất cả mọi người một năm bình an!
