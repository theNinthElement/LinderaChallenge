console.log('hello world')

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const userRouter = require('./routes/users');

const app = express();

//mongo db uri
const { MONGO_URI } = process.env
const { PORT } = process.env

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function connect() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongo db is connected");
    }catch (error) {
        console.log(error)
    }
}

connect();

app.use('/users', userRouter);

app.listen (PORT, () => {
    console.log("Server started at port ", PORT);
});

async function end() {
    try {
        await mongoose.disconnect();
        console.log("Mongo Shut down");
    } catch(err) {
        console.log(err);
    }

    try {
        app.exit();
    } catch(err) {
        console.log("cannot shut the port")
    }
}

module.exports = app