const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/product/rating',controller.createProductRating);
router.get('/product/rating',controller.getAllProductRating);
router.get('/product/rating/user',controller.getUserProductRating);
router.get('/product/rating/:id',controller.getProductRating);
router.get('/', controller.test);
module.exports = router;