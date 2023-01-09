const { ServerDescriptionChangedEvent } = require("mongodb");
const ProductRating = require("../../models/productRating");

/**
 * Thêm 1 đánh giá sản phẩm mới
 * @param {{
 *    userId: String,
 *	  userName: String,
 *    message: String,
 *    orderId: String,
 *    productId: String,
 *    starNumbers: Number
 * }} data 
 * @returns new ProductRating
 */
exports.createProductRating = async (data) => {
	data.starNumbers = parseInt(data.starNumbers);
	let newRating = {
		orderId: data.orderId,
		userId: data.userId,
		description: data.message,
		star: data.starNumbers,
		userName: data.userName,
	};


	// 1. Nếu productId chưa có trong DB, insert nó vào DB
	let defaultRating = {
		productId: data.productId,
		totalVote: 0,
		avgStar: 0,
		ratingList: []
	}
	await ProductRating(DB_CONNECTION).updateOne(
		{'productId': data.productId},
		{$setOnInsert: defaultRating},
		{upsert: true},
	);
	

	// 2. Thêm đánh giá mới vào rating list
	// new avgStar = (avgStar * (totalVote - 1) + starNumber) / totalVote
	let {totalVote, avgStar} = await ProductRating(DB_CONNECTION).findOne(
		{'productId': data.productId},
		{'totalVote': 1, 'avgStar': 1, '_id': 0}
	) || {totalVote: 0, avgStar: 0};

	console.log(totalVote, avgStar)
	let newAvgStar = (avgStar * totalVote + data.starNumbers) / (totalVote + 1);

	let result = await ProductRating(DB_CONNECTION).updateOne(
		{'productId': data.productId},
		{
			$set: {'avgStar': newAvgStar},
			$inc: {'totalVote': 1},
			$push:{'ratingList': newRating}
		}
	);
	let newProductRating=await ProductRating(DB_CONNECTION).findOne(
		{'productId': data.productId}
	);
	return newProductRating

}


/**
 * Lấy danh sách đánh giá của tất cả sản phẩm
 * @return {[{
 * 	productId: string,
 * 	avgStar: number,
 * 	totalVote: number
 * }]} result
 */
exports.getAllProductRating = async () => {
	let result = await ProductRating(DB_CONNECTION).aggregate([
		{$project: {'productId': 1, 'avgStar': 1, 'totalVote': 1, '_id': 0}}
	]);
	return result;
}


/**
 * Lấy danh sách đánh giá của một sản phẩm theo productId
 * @param {string} productId
 * @return {{
 * productId: string
 * avgStar: number,
 * totalVote: number,
 * ratingList: [{
 * 		userName: string,
 * 		userId: string,
 * 		star: number,
 * 		description: string,
 * 		handler: string,
 *      createdAt: Date,
 * 		updatedAt: Date
 * }]
 * }}
*/
exports.getProductRating = async (productId) => {
	let result = await ProductRating(DB_CONNECTION).findOne(
		{'productId': productId}
	);
	return result;
}





/**
* Kiểm tra 1 người dùng đã đánh giá 1 sp chưa
*@return {{
*		   content: boolean
*          message: String 
*		 }}
*/
exports.getUserProductRating = async(data) => {
	let productRateInfor = await ProductRating(DB_CONNECTION).findOne(
		{'productId': data.pid}
	);
	let result = productRateInfor.ratingList.some(object => object.userId === data.uid)
	if (result==true) {
		return {
			content:result,
		    message:"The user has rated this product previous"
		}
	} else {
		return {
			content:result,
			message:"The user didn't rate this product previous"
		}
	}
}
/**
* Lấy danh sách đánh giá của tất cả sản phẩm (Chỉ dùng trong nhóm)
* @return {[{
*   _id: String
* 	productId: String,
* 	userId: String,
* 	userName: String,
*   star:Number,
*   orderId: String,
*   description: String,
*   handler: String,
* }]} result
*/
exports.privateGetAllProductRating = async()=>{
	let result = await ProductRating(DB_CONNECTION).aggregate([
		{$project: {'ratingList._id': 1,'productId': 1, 'ratingList.userId': 1, 'ratingList.star': 1, 'ratingList.orderId': 1,'ratingList.description': 1,'ratingList.handler': 1,'ratingList.createdAt':1,'ratingList.updatedAt':1}},
		{$unwind : {path:"$ratingList"} },
		{$replaceRoot:  {newRoot:{ $mergeObjects:[{productId: "$productId" }, "$ratingList"]}}}
	]);
	return result;
}
/**
 * Lấy thông tin chi tiết một đánh giá (Chỉ dùng trong nhóm)
 * @param {string} ratingId
 * @return {[{
 *   _id:String,
 *   productId: String,
 *   userId: String,
 *   userName: String,
 *   star: Number
 *   orderId: String,
 *   description: String,
 *   handler: String
 * }]}result
 */
exports.privateGetProductRating = async(ratingId) =>{
	let productInfor=await this.privateGetAllProductRating()	
	let result=productInfor.find(object => object._id == ratingId)
	return result
}