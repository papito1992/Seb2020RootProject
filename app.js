const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const challengeRoute = require('./routes/challenge-route');

app.use(bodyParser.json());
app.use('/', challengeRoute);

app.listen(port, () => console.log(` Listening at http://localhost:${port}/`));