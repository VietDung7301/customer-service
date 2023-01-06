const UserComplain=require("../../models/userComplain");
const UserProduct=require("../../models/userProduct");

exports.createUserComplain=async (data) => {
    /* var newData={
        userId:data.userId,
        userAccount:data.userAccount,
        userProblem:parseInt(data.userProblem),
        userEmail:data.userEmail,
        orderId:data.orderId,
        problemDescription:data.problemDescription
     }
      var check_order=0;*/
     if(data){
        let newData=await UserComplain(DB_CONNECTION).create(data)
        let newUserComplain = await UserComplain(DB_CONNECTION).findById({_id: newData._id})
        return newUserComplain
     /*   let CountAccount=await UserProduct(DB_CONNECTION).countDocuments({'userAccount':data.userAccount});
     if(CountAccount==0){
        console.log("Toang");
       return {
        status:"Error1",
        message:"Khong ton tai account",
        value:null
       }
     }else{
       await UserProduct(DB_CONNECTION).find({'userAccount':data.userAccount},function(err,docs){
                      if(err){
                       console.log(err);
                      }else{
                      if(parseInt(data.userProplem)<4){
                      // console.log(docs[0].userOrder);
                       
                       if(docs[0].userOrder.find(o => o.orderId == data.orderId)!=undefined){
                       check_order=1;
                       }
                      }
                      }
        }).clone()
        if(parseInt(data.userProblem)<4&&parseInt(data.userProblem)>=1){
           if(check_order==1){
            
          let newgod=await UserComplain(DB_CONNECTION).create(data)
          
           let newUserProduct=await UserComplain(DB_CONNECTION).find({"userAccount":data.userAccount})
           console.log(newgod);
           return {
              status:"Success",
              message:"Yeu cau thanh cong",
              value:newUserProduct
           }
        }else{
           return{
              status:"Error2",
              message:"San pham khong ton tai",
              value:null
           }
        }
        }else{
          await UserComplain(DB_CONNECTION).create(data);
           let newUserProduct=await UserComplain(DB_CONNECTION).find({"userAccount":data.userAccount})
           console.log(newUserProduct);
           return{
              status:"Success",
              message:"Yeu cau thanh cong",
              value:newUserProduct
           }
        }
     }
     */
     }
  }