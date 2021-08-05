const { appTask } = require('../models/app');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
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
