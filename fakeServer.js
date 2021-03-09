#!/usr/bin/env node

var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(
    bodyParser.json({
        limit: '50mb',
    })
);

app.post('/search', cors(), (request, response) => {
    response.status(200).send([{
        id: 1,
        name: 'University of Amsterdam'
      }, {
        id: 2,
        name: 'Delft University of Technology'
      }, {
        id: 3,
        name: 'Utrecht University'
      }, {
        id: 4,
        name: 'Vrije Universiteit Amsterdam'
      }, {
        id: 5,
        name: 'Leiden University'
      }]);
});

app.post('/signup', cors(), (request, response) => {
    response.sendStatus(200);
});

app.listen(port, () => console.log(`Fake server running on localhost:${port}`));
