const UserComplain=require("../../models/userComplain");
const UserProduct=require("../../models/userProduct");

exports.createUserComplain=async (data) => {
  
     if(data){
        let newData=await UserComplain(DB_CONNECTION).create(data)
        let newUserComplain = await UserComplain(DB_CONNECTION).findById({_id: newData._id})
        return newUserComplain
     }
  }