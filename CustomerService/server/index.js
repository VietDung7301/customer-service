const express = require("express");
const app = express();
const server = require("http").createServer(app);
const router = express.Router();

/**
 * Import các biến toàn cục
 */
require("dotenv").config();
require("./global")(server);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));

/**
 * Import router dùng để bắt dữ liệu liên quan đến đánh giá product
 */
router.use("", require("./modules/rating/route"));


app.use(router);

/**
 * Khởi động server
 */
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server up and running on: ${port}`);
})