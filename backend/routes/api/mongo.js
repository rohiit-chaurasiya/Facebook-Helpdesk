require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://texttoolkit:Kietian9211@cluster0.pogtkx8.mongodb.net/texttoolkit?retryWrites=true&w=majority')
.then(() => console.log("connected to Mongodb"))
.catch((err) => console.log("cannot connect to mongo server"));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

module.exports = db;