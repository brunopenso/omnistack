const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://omnistack:omnistack@omnistack-oi2ie.mongodb.net/mydb?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch( error => console.log(error))
.then(console.log('Mongoose is connected'))
.finally(console.log('Mongoose connect method end'));

// req.query = query string parameters
// req.params = path parameters
// req.body = body of the message

//tells to express to understand json body messages
app.use(express.json());

app.use(routes);

//mongodb+srv://omnistack:<password>@omnistack-oi2ie.mongodb.net/admin?retryWrites=true&w=majority

app.listen(3333);