const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdminRequestSchema = new Schema({
    id: {
        type: String
    },
    userName: {
        type: String
    },
    userEmail:{
        type: String
    },
    content: {
        type: String
    },
    staff:{
        type: String
    },
    status:{
        type: String
    },
    sendOnDate:{
        type: Date
    }
    
})

module.exports = (db) => {
    if (!db.models.AdminRequest) {
        return db.model('AdminRequest', AdminRequestSchema)
    }
    return db.models.AdminRequest
}