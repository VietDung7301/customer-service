import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Request } from 'src/app/model/request';
import { RequestService } from 'src/app/services/requests/request.service';
import { UserService } from 'src/app/services/user/user.service';

export enum Role {
  ADMIN = 0,
  TOANNV = 1,
}

export enum ViewMode {
  All = 0,
  OnlyMe = 1,
}

@Component({
  selector: 'app-request-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.css'],
})
export class ComplainListComponent implements OnInit {
  fullTextSearch: string = '';
  listOfData: Request[] = [];
  listOfDisplayData: Request[] = [];
  listOfCurrentPageData: Request[] = [];
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  currentRole: Role = Role.ADMIN;
  Role = Role;
  ViewMode = ViewMode;
  viewMode: ViewMode = ViewMode.All;
  defaultAvatar: string = '../../../../assets/avatar.png'

  listEmployee = ['leduchuy', 'levantoan', 'phamnhatsang'];
  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  listOfFilterStatus = [
    { text: 'Mới', value: 'waiting' },
    { text: 'Mở', value: 'processing' },
    { text: 'Đã trả lời', value: 'replied' },
  ];
  filterFnStatus = (list: string[], item: any) =>
    list.some((status) => item.status == status);

  listOfFilterStaff = [
    { text: 'Chưa được gán', value: null },
    { text: 'Sang', value: 'phamnhatsang' },
    { text: 'Toàn', value: 'levantoan' },
    { text: 'Huy', value: 'leduchuy'}
  ];
  filterFnStaff = (list: string[], item: any) =>
    list.some((staff) => item.staff == staff);

  ngOnInit(): void {
    this.fetchData();
    this.currentRole = Role.ADMIN;
  }

  async fetchData() {
    await this.userService.login();
    var response = await this.requestService.getListRequest();
    this.listOfData = response;
    this.listOfDisplayData = [...this.listOfData];
  }

  nzOnSearch(): void {
    this.listOfDisplayData = this.listOfData.filter((item: Request) =>
      item.content.toLowerCase().includes(this.fullTextSearch.toLowerCase())
    );
  }

  onCancelSearch() {
    this.fullTextSearch = '';
    this.nzOnSearch();
  }

  onCurrentPageDataChange(listOfCurrentPageData: any) {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some(({ id }) =>
        this.setOfCheckedId.has(id)
      ) && !this.checked;
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ id }) =>
      this.updateCheckedSet(id, checked)
    );
    this.refreshCheckedStatus();
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  getSendRequestTime(time: string): string {
    var date: any = new Date(time);
    let sentYear = date.getFullYear();
    let sentMonth = date.getMonth() + 1;
    let sentDate = date.getDate();
    var today: any = new Date();

    var differenceInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    var differenceInHours = Math.floor((today - date) / (1000 * 60 * 60));
    var differenceInMinutes = Math.floor((today - date) / (1000 * 60));
    if (differenceInDays > 7) {
      return sentDate + '/' + sentMonth + '/' + sentYear;
    } else if (differenceInDays > 1) {
      return differenceInDays + ' ngày trước';
    } else if (differenceInHours > 23) {
      return '1 ngày trước';
    } else if (differenceInHours > 1) {
      return differenceInHours + ' giờ trước';
    } else if (differenceInMinutes > 59) {
      return '1 giờ trước';
    } else if (differenceInMinutes > 1) {
      return differenceInMinutes + ' phút trước';
    } else {
      return 'Hiện tại';
    }
  }

  onChangeViewMode(ev: any) {
    if (ev == ViewMode.OnlyMe) {
      var newData = this.listOfData.filter(
        (item: Request) => item.staff == 'ToanNV'
      );
      this.listOfData = newData;
      this.listOfDisplayData = [...this.listOfData];
    } else {
      this.fetchData();
    }
  }

  assignWork(ev: any) {
    console.log([...this.setOfCheckedId][0]);
    this.setOfCheckedId.forEach((responseId) => {
      var thisRequest = this.listOfData.find(
        (request) => request.id == responseId
      );
      var data = { ...thisRequest, staff: ev };
      this.requestService
        .updateRequest(responseId, data)
        .toPromise()
        .then((reponse) => {
          this.message.success('Gán công việc thành công');
          // Update view
          var data = this.listOfDisplayData.find((request)=>request.id == responseId);
          if (data != undefined) {
            data.staff = ev;
          }
        });
    });
  }
}
