const { appTask } = require('../models/app');
const express = require('express');
const joi = require('joi');

const router = express.Router();

router.post('/', async (req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).max(150).required(),
        author: joi.string().min(3).max(30),
        uid: joi.string(),
        isComplete: joi.boolean(),
        date: joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, author, isComplete, date, uid } = req.body;

    let routerTask = new appTask({
        name,
        author,
        isComplete,
        date,
        uid,
    });

    try {
        routerTask = await routerTask.save();
        res.send(routerTask);
    } catch (err) {
        res.status(500).send(err.message);
        console.error(err.message);
    }
});

module.exports = router;
