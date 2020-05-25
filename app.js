const express = require('express');
const bodyParser = require('body-parser');

const challengeRoute = require('./routes/challenge-route');

const app = express();

app.use(bodyParser.json());

app.use('/', challengeRoute);

app.listen(5000);