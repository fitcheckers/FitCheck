'use strict';

const app = require('./server');

require('./endpoints');

app.listen(80, () => {
    console.log('express server is now running on port 80');
});