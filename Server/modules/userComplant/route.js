const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/user/complain',controller.createUserComplain);
router.get('/user/complain',controller.getListRequest);
router.put('/user/complain/:id',controller.updateRequest);
module.exports = router;