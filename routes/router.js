const { appTask } = require('../models/app');
const express = require('express');
const joi = require('joi');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getTasks = await appTask.find().sort({ date: -1 });
        res.send(getTasks);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

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

router.put('/:id', async (req, res) => {
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

    const putTask = await appTask.findById(req.params.id);
    if (!putTask) {
        return res.status(404).send('Put task is not found');
    }
    const { name, author, isComplete, date, uid } = req.body;
    try {
        const updatedTasks = await appTask.findByIdAndUpdate(
            req.params.id,
            {
                name,
                author,
                isComplete,
                date,
                uid,
            },
            { new: true }
        );
        res.send(updatedTasks);
    } catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // delete one
        /*const taskDelete = await appTask.deleteOne({ isComplete: true });
        res.send(taskDelete);*/
        // delete many
        /*const taskDeleteMany = await appTask.deleteMany({ isComplete: false });
    res.send(taskDeleteMany);*/
        // find by id and delete
        // '/:id' should be with findByIdAndDelete method
        const taskFindAndDelete = await appTask.findByIdAndDelete(req.params.id);
        res.send(taskFindAndDelete);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

module.exports = router;
