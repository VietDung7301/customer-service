import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/requests/request.service';

let problemType = [
	"Giao hàng và nhận hàng",
	"Trả hàng và hoàn tiền",
	"Thanh toán",
	"Báo lỗi",
	"Câu hỏi chung"
];
@Component({
	selector: 'app-complain-detail',
	templateUrl: './complain-detail.component.html',
	styleUrls: ['./complain-detail.component.css'],
})



export class ComplainDetailComponent implements OnInit {
	complainId: any;
	replyList: any;
	complainInfor: any;
	newComment: string = '';
	complainProblem: string = '';
	constructor (
		public route: ActivatedRoute,
		private requestService: RequestService
	) {}
	ngOnInit(): void {
		this.complainId = this.route.snapshot.queryParamMap.get('id');
		console.log("id", this.complainId);
		this.fetchData();
  	}

	async fetchData() {
    	var response = await this.requestService.getComplainById(this.complainId);
		this.complainInfor = response;
		this.complainProblem = problemType[this.complainInfor.userProblem - 1];
  	}

	async sendComment() {
		console.log("sending comment");
		await this.requestService
			.sendComment(this.complainId, this.newComment)
			.toPromise()
			.then(() => {
				this.newComment = '';
				this.fetchData();
			})
	}
}