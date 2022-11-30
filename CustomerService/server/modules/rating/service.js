const ProductRating = require("../../models/productRating");

exports.createProductRating = async (data) => {
    let newProductRating;
    if (data) {
        newProductRating = await ProductRating(DB_CONNECTION).create({
            orderId: data.orderId,
            productId: data.productId,
            userName: data.userName,
            userId: data.userId,
            starNumbers: data.starNumbers,
            message: data.message
        })
    }
    let productRating = await ProductRating(DB_CONNECTION).findById({_id: newProductRating._id});
    console.log("productRating", productRating);
    return productRating;
}

exports.getAllRating = async () => {
    let allRating = await ProductRating(DB_CONNECTION).find();
    console.log(allRating);
    return allRating;
}