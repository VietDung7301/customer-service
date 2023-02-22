import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.login();
    this.userName = localStorage.getItem('userName');
  }

}
