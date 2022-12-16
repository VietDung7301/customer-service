const ProductRating = require("../../models/productRating");

exports.createProductRating = async (data) => {

    let newProductRating;
    
    if (data) {
     var newData= {orderId: "00000",
  productId: "00000",
 
  totalVoteForProduct:0,
  averageStar:0,
  userVote:[{userId:"00000",userName:"00000",voteStars:0,voteMessage:"000000"}]
    }
  
   let CountDocument=await ProductRating(DB_CONNECTION).countDocuments({'productId':data.productId});
   if(CountDocument==0){
    newData.productId=data.productId;
    newData.orderId=data.orderId;
    newData.totalVoteForProduct=1;
    newData.averageStar=parseInt(data.voteStars);
    newData.userVote=[{userId:data.userId,userName: data.userName,voteStars:data.voteStars,voteMessage:data.voteMessage}];

    newProductRating = await ProductRating(DB_CONNECTION).create(newData);


   let productRating = await ProductRating(DB_CONNECTION).findById({_id: newProductRating._id});
  console.log("productRating", productRating);
  return productRating
   }else{
    await ProductRating(DB_CONNECTION).find({'productId':data.productId},function(err,docs){
      if(err){
       console.log(err);
      }else{
       newData.productId=docs[0].productId;
       newData.orderId=docs[0].orderId;
       newData.totalVoteForProduct=docs[0].totalVoteForProduct+1;
       newData.averageStar=(docs[0].averageStar*docs[0].totalVoteForProduct+parseInt(data.voteStars))/(docs[0].totalVoteForProduct+1);
      
       var uservoteX={userName:data.userName,userId: data.userId,voteStars:data.voteStars,voteMessage:data.voteMessage};
      
       docs[0].userVote.push(uservoteX);
       newData.userVote=docs[0].userVote;
      
      }
       
      }).clone();

      await ProductRating(DB_CONNECTION).findOneAndUpdate({'productId':data.productId},newData);
      newProductRating =await ProductRating(DB_CONNECTION).find({'productId':data.productId});
      console.log("productRating", newProductRating);
      return newProductRating;
   }
}
}