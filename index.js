const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('The project has been launched');
});

const connect_str = process.env.CONNECTION;

app.listen(5000, () => {
    console.log('Server is running on port 5000');
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
