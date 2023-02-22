import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.userAPI;
  constructor(private http: HttpClient) {}

  // Đăng nhập vào hệ thống, tên đăng nhập mặc định như phía dưới
  // Mục đích: Để lấy access_token từ module quản lý người dùng và lưu vào localStorage
  login() {
    const url = `${this.baseUrl}/api/login`;
    const body = {
      email: "toan123@gmail.com",
      password: "123456"
    };
    const response = this.http.post<any>(url, body)
      .subscribe(data => {
        console.log('data', data)
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
      })
  }

  getUserInfor(id: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    console.log('headers', headers);
    return this.http.get<any[]>(`${this.baseUrl}/api/user/${id}`, {headers: headers});
  }
}
