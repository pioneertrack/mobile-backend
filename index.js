'use strict';
/* Load modules */

const path = require('path');
const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
/* Database configuration */
const database = require('./app/config/dbconfig');

database.init();

/* Init server listening */
const port = 3000;
app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});
/* Express configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: 86400000,
    setHeaders: function (res, path) {
        console.log(path);
        res.setHeader("Expires", new Date(Date.now() + 2592000000 * 30).toUTCString());
    }
}));
/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/Router'));