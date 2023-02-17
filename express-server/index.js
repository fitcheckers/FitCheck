'use strict';

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('express server');
});

app.listen(3000, () => {
    console.log('express server is now running on port 3000');
});