
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserComplainSchema=new Schema({
    userId:{
        type:String
    },
    userAccount:{
        type:String
    },
    userProblem:{
        type:Number
    },
    userEmail:{
        type:String
    },
    orderId:{
        type:String
    },
    problemDescription:{
        type:String
    },
    status:{
        type:Number
    }
},{
    timestamps: true
})

module.exports = (db) => {
    if (!db.models.UserComplain) {
        return db.model('UserComplain', UserComplainSchema)
    }
    return db.models.UserComplain
}