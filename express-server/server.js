'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(function checkJSON(req, res, next) {
    if (req.headers['content-type'] !== 'application/json') res.status(400).send('Server requires application/json');
    next();
});

module.exports = app;

