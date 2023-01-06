const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/user/complain',controller.createUserComplain);
module.exports = router;