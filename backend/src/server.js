const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http')

const app = express();
const server = http.server(app);
const io = socketio(server);

const mongoUrl = "mongodb+srv://omnistack:omnistack@omnistack-oi2ie.mongodb.net/mydb?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.catch( error => console.log(error))
.then(console.log('Mongoose is connected'))
.finally(console.log('Mongoose connect method end'));

// req.query = query string parameters
// req.params = path parameters
// req.body = body of the message

//dot not use it
app.use(cors({origin: '*'}));
//tells to express to understand json body messages
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')));
//use the routes files
app.use(routes);

server.listen(3333);