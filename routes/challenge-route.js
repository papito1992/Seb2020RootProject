const express = require('express');

// const numberController = require('../controllers/challenge-controller');
const numberController = require('../controllers/ArnasViaceslavController');

const router = express.Router();

router.post('/', numberController.doPrototypeStuff);

module.exports = router;
