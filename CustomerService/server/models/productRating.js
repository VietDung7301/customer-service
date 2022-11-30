const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductRatingSchema = new Schema({
    orderId: {
        type: String
    },
    productId: {
        type: String
    },
    userName: {
        type: String
    },
    userId: {
        type: String
    },
    starNumbers: {
        type: Number
    },
    message: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = (db) => {
    if (!db.models.ProductRating) {
        return db.model('ProductRating', ProductRatingSchema)
    }
    return db.models.ProductRating
}