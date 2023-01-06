const { ListCollectionsCursor } = require("mongodb")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductRatingSchema = new Schema({
    productId: {
        type: String
    },
    totalVoteForProduct:{
        type: Number
    },
    averageStar:{
        type: Number
    },
    userVote: [
        {
            orderId: {
                type: String
            },
            userName: {
                type: String
            },
            userId: {
                type: String
            },
            voteStars: {
                type: Number
            },
            voteMessage: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = (db) => {
    if (!db.models.ProductRating) {
        return db.model('ProductRating', ProductRatingSchema)
    }
    return db.models.ProductRating
}