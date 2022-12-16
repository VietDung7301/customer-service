const express = require("express");
const app = express();
const server = require("http").createServer(app);
const router = express.Router();
const cors = require("cors");

/**
 * Import các biến toàn cục
 */
require("dotenv").config();
require("./global")(server);

const allowedOrigins = ['http://localhost:4200',
                      'www.example2.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

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