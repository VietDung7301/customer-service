/**
 * File này khởi tạo các biến global, có thể được sử dụng trong toàn bộ chương trình
 */

const mongoose = require("mongoose");
const models = require('./models')


const initModels = (db, models) => {
    for (const [key, model] of Object.entries(models)) {
        if (!db.models[key]) model(db)
    }
}

module.exports = async(server) => {
    const connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    global.DB_CONNECTION = mongoose.createConnection(
        /*`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || "27017"}/${process.env.DB_NAME}`*/
`mongodb://mongo:ltij5XESmo4xitBu0Io5@containers-us-west-114.railway.app:6673`,
        connectOptions
    );

    initModels(DB_CONNECTION, models);
}