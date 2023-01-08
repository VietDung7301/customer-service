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