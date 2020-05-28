const express = require('express');

const numberController = require('../controllers/challenge-controller');

const router = express.Router();

router.post('/', numberController.getRandomNumber);

module.exports = router;
