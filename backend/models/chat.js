const mongoose = require('mongoose');

const chat = new mongoose.Schema({
    message: String,
    createdAt: {type:Date, default:Date.now},
    id: Number,
},{timestamps:true});

module.exports = chat;