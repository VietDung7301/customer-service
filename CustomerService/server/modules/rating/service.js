const ProductRating = require("../../models/productRating");

exports.createProductRating = async (data) => {
    let newProductRating;
    if (data) {
        newProductRating = await ProductRating(DB_CONNECTION).create({
            orderId: data.orderId,
            productId: data.productId,
            userName: data.userName,
            userId: data.userId,
            voteStars: data.voteStars,
            voteMessage: data.voteMessage
        })
    }
    let productRating = await ProductRating(DB_CONNECTION).findById({_id: newProductRating._id});
    console.log("productRating", productRating);
    return productRating;
}