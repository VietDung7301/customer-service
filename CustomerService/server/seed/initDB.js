const mongoose = require("mongoose")
const {ProductRating} = require("../models/productRating")

require("dotenv").config();

const initDB = async () => {
    console.log("Starting init database. Please wait...\n");

    /**
     * 1. Tạo kết nối đến database
     */
    const connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    const systemDB = mongoose.createConnection(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || "27017"}/${process.env.DB_NAME}`,
        connectOptions
    );

    if (!systemDB) throw ("ERROR: Cannot connect to database");

    /**
     * 2. Xóa dữ liệu cũ và khởi tạo dữ liệu mới
     */
    systemDB.dropDatabase();
    console.log("@Setup new database")
    
    await ProductRating(systemDB).insertMany([
        {
            orderId: "day la 1",
            productId: "day la product",
            userName: "day la us",
            userId: 'id',
            voteStars: 5,
            voteMessage: 'chua chac da gion dau'
        }
    ])

    systemDB.close();
    console.log("\n\nDone. Initial database successfully.");
}

initDB().catch(error => {
    console.log(error);
    process.exit();
})