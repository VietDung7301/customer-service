const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/product/rating',controller.createProductRating);
router.get('/', controller.test);
router.post('/user/complain',controller.createUserComplain);
module.exports = router;