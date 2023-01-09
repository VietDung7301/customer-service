
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
    source:{
        type:String
    },
    status:{
        type:Number,
        default:0
    },
    handler:{
        shortDescription:{
            type:String
        },
        solution:{
            type:String
        },
        comment:{
            type:String
        },
        reply:[{
            userId:{
                type:String
            },
            userName:{
                type:String
            },
            content:{
                type:String
            }
        }]
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