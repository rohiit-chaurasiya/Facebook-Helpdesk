const request = require('request');
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // creates express http server

const mongoose = require('mongoose');


module.exports = app;