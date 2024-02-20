const express = require("express");
const cors = require("cors");
// creates express http server
const app = express();
// uses cors for api calls
app.use(cors());

const { Server } = require("socket.io");
const { createServer } = require("http");

require("dotenv").config();
const db = require("./routes/api/mongo");

const mongoose = require("mongoose");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

// const webhook = require('./routes/api/webhook');
const user = require("./routes/api/user");
// app.use(webhook);
app.use(user);

app.get("/", (req, res) => {
    res.send("helpdesk main page is here");
});

//  WEBHOOK METHODS STARTS HERE
const chat = require("./models/chat");

io.on("connection", (socket) => {
    socket.emit('check', 'socket data from backend');
});

// Creates the endpoint for our webhook
app.post("/webhook", (req, res) => {
    let body = req.body;
    console.log(req);

    // Checks this is an event from a page subscription
    if (body.object === "page") {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log("Sender PSID: " + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Return a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Return '404 NOT FOUND' if event is not from a page subscription
        res.sendStatus(404);
    }
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "ChaluHojaaBhai";

    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

app.post('/messages', (req, res) => {
    const userId = req.query.userId;
    const message = req.body.text;

    const User = new mongoose.model(userId, chat);
    const reply = new User({message: message, id: 1});
    reply.save((err) => {
        if (err) {
            console.log(err);
        }
    })
    io.sockets.emit('check', userId);
    res.sendStatus(200);
})

function handleMessage(sender_psid, received_message) {
    let response;

    // if (received_message.text) {
    //     response = {
    //         text: "Message recieved will reach to you soon.",
    //     };
    // }

    console.log("message recieved inserting to the db");

    const User = new mongoose.model(sender_psid, chat);

    const message = new User({ message: received_message.text, id: 0 });
    message.save((err) => {
        if (err) {
            console.log(err);
        }
    });

    // using socket to inform our front end about new messages
    io.sockets.emit('check', sender_psid);

    // Sending the response
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    };
    console.log("called the send api function");
}

///////  WEBHOOK METHODS END HERE ////////////

const PORT = process.env.PORT || 1337;
httpServer.listen(PORT, () =>
    console.log("server is running on PORT: ", { PORT })
);
