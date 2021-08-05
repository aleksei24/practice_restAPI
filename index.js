const router = require('./routes/router');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// import { appTask } from './models/app.js';

// dotenv.config();

// console.log(appTask);

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/practice_restAPI', router);

app.get('/', (req, res) => {
    res.send('The project has been launched');
});

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
