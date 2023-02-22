## Cách deploy sử dụng firebase
#### 1. Tạo tài khoản firebase tại [console.firebase.google.com](https://console.firebase.google.com)
Sau đó tạo mới 1 project 
#### 2. install firebase
```shell
npm i -g firebase-tools
```
#### 3. build project
```shell
ng build --prod
```
#### 4. login to firebase
```shell
firebase login
```
Chọn no nếu được yêu cầu collects CLI.

#### 5. init firebase
```shell
firebase init
```
Chọn option "hosting: configure and deploy". Sau đó nhấn enter

Chọn option "use an existing project" và chọn project vừa tạo ở bước 1

Với option "what do you want to use as public directory", nhập: "dist/salesystem"

Với option "rewrite all to /index.html" chọn "yes"

Với option "overwrite" chọn "no"

#### 6. deploy lên firebase
```shell
firebase deploy --only hosting
```
Truy cập vào đường link hiện thị trên console
