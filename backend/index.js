const express = require("express")
var cors = require('cors')
const http = require("http");
const socket = require("socket.io");
const { getEmotion } = require('./mlClass/ibmNLP')
const { predict } = require('./mlClass/tfCNN');

const app = express()
app.use(cors());
app.use(express.json()); // Parse JSON

const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = socket(server);

let users = [];
let ids = [];
let connections = [];
let total_sentiment_score = 0;
let message_count = 0;

io.on("connection", socket => {

    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length)


    // Send client their id
    socket.emit("your id", socket.id);
    ids.push(socket.id);

    // New user
    socket.on('new user', body => {
        socket.username = body.Username;
        users.push(socket.username);
        updateUsernames();
    });

    // Client send message, emit server
    socket.on("send message", message => {
        getEmotion(message.body)
            .then(emotion => {
                message.emotion = emotion;
                io.emit("message", message);
            });

        updateSentiment(message.body);
    });

    // Client disconnect
    socket.on('disconnect', body => {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // Update list of users
    let updateUsernames = async () => {
        io.sockets.emit('get users', users);
    }

    // Get sentiment of message
    let updateSentiment = async (input_text) => {
        message_count++;
        predict(input_text)
            .then(sentiment => {
                total_sentiment_score += sentiment;
                console.log('total sentiment:', total_sentiment_score / message_count);
                io.sockets.emit('get sentiment', total_sentiment_score / message_count);
            })
            .catch(err => {
                console.log('error:', err);
            });
    }

});

server.listen(port, () => console.log(`server is running on port ${port}`));
