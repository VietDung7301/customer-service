const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/user/complain',controller.createUserComplain);
router.get('/user/complain/request',controller.getListRequest);
router.post('/user/complain/update',controller.updateRequest);
module.exports = router;