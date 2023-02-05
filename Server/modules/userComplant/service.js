const UserComplain = require("../../models/userComplain");
const UserProduct = require("../../models/userProduct");
const {sendEmail} = require("../helpers/email");


/**
 * Thêm complain mới từ người dùng:
 * @param {{userId,userAccount,userProblem,userEmail,orderId,problemDescription}} data 
 * @returns 
 */
exports.createUserComplain = async (data) => {
	if (data) {
		// 1. Lưu complain vào database
		let newData = await UserComplain(DB_CONNECTION).create(data)
		let newUserComplain = await UserComplain(DB_CONNECTION).findById({_id: newData._id})


		// 2. Gửi mail thông báo cho người dùng
		let emailTo = data.userEmail;
		let subject = '[Hệ thống bán hàng AS-K64][Đã ghi nhận yêu cầu]';
		let html = `<html>
		<head>
			<style>
				body {
				  font-family: calibri;
				}
				.wrapper {
					width: 100%;
					min-width: 580px;
					background-color: #FAFAFA;
					padding: 10px 0;
				}
				.info {
					list-style-type: none;
				}
				.form {
					border: solid 1px #dddddd;
					padding: 50px 30px;
					border-radius: 3px;
					margin: 0px 25%;
					background-color: #FFFFFF;
				}
		
				.title {
					text-align: center;
				}
		
				.footer {
					margin: 0px 25%;
					text-align: center;
				}
			</style>
		</head>
		
		<body>
			<div class="wrapper">
				<div class="title">
					<h2>Đội ngũ chăm sóc khách hàng AS-K64</h2>
				</div>
				<div class="form">
				  <p>Thân chào ${data.userAccount},
					  chúng tôi đã nhận được yêu cầu của bạn:
				  </p>
				  <p><b>Vấn đề bạn gặp phải: </b>${data.userProblem}
				  <br>
				  <b>Mô tả vấn đề: </b>${data.problemDescription}
				  </p>
				  <p>Chúng tôi sẽ xử lý và liên hệ với bạn sớm nhất có thể</p>

				</div>
				<div class="footer">
					<p>Đây là email tự động, vui lòng không trả lời qua email này.
					</p>
				</div>
			</div>
		</body>
	  	</html>`;
		await sendEmail(emailTo, subject, null, html);

		return newUserComplain
	}
}
/**
 * Lấy danh sach request:
 * @returns {{[
 * id:String,
 * userName:String,
 * userEmail:String,
 * userAvatar:String,
 * content:String,
 * staff:String,
 * status:String,
 * sendOnDate:Date
 * ]}} 
 */
exports.getListRequest = async () => {
	let result = await UserComplain(DB_CONNECTION).aggregate([
		{$unwind : {path:"$handler.reply"}},
		{$project: {
			'id':'$_id',
			'userName': 1, 
			'userEmail': 1,
			'userAvatar': 1,
			'content': '$problemDescription', 
			'staff': '$handler.reply.staffName', 
			'status': 1,
			'sendOnDate':'$createdAt'
		}},
		{$addFields: {
			"status": {
			$switch: {
			branches: [
			{case: {$eq: ["$status", 0]}, then: "waiting"},
			{case: {$eq: ["$status", 1]}, then: "processing"},
			{case: {$eq: ["$status", 2]}, then: "replied"}
			],
			default: ""
			}
			}
			}},
		{$replaceRoot:  {newRoot:{ 
			"id": "$id",
            "userEmail": "$userEmail",
            "userAvatar": "$userAvatar",
            "status": "$status",
            "userName": "$userName",
            "content": "$content",
            "staff": "$staff",
            "sendOnDate": "$sendOnDate"
		}}}
	]);
	
	return result;
}
/**
 * cập nhật  request:
 * @param {{id,userName,userEmail,userAvatar,content,staff}} data
 * @returns {{[
* id:String,
* userName:String,
* userEmail:String,
* userAvatar:String,
* content:String,
* staff:String,
* status:String,
* sendOnDate:Date
* ]}}data
*/
exports.updateRequest = async (data)=> {
	        if(data){
		         let updateValue;
            if (data.condition === "waitting") {
                     updateValue = { status: 0 };
               } else if (data.condition === "processing") {
                     updateValue = { status: 1 };
               } else if (data.condition === "replied") {
                     updateValue = { status: 2 };
               }else{
				     updateValue = { status: -1 };
			   }
		await UserComplain(DB_CONNECTION).updateOne(
		{'_id': data.id},
		{
		   $set: {  userName:   data.userName,
			        userEmail:  data.userEmail,
					userAvatar: data.userAvatar,
					createdAt: new Date(data.sendOnDate),
					updateValue,
			        "handler.reply.0.staffName": data.staff, 
		            "handler.reply.0.content": data.content  
				 }
		}
		);

       return data;
		  

    }
}