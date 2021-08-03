const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { appTask } = require('./models/app');

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('The project has been launched');
});

console.log(appTask);

const connect_str = process.env.CONNECTION;
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose
    .connect(connect_str, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connection is running');
    })
    .catch((err) => {
        console.error('MongoDB connection failed: ', err.message);
    });
