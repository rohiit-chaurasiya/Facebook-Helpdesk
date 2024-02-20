const request = require('request');
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // creates express http server

const cors = require("cors");
app.use(cors());

const mongoose = require('mongoose');
const db = require('./mongo');
const chat = require('../../models/chat');

app.get('/user', (req, res) => {
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(names);
        }
    });
});

app.get('/messages', (req, res) => {
    const userId = req.query.userId;

    if (userId === 'none') res.send('empty')
    else { 
        const User = new mongoose.model(userId, chat);

        User.find({}, (error, message) => {
            res.send(message);
        })
    }
})



module.exports = app;