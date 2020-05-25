const express = require('express');

const numberController = require('../controllers/challenge-controller');

const router = express.Router();

router.get('/number', numberController.getRandomNumber);

module.exports = router;
