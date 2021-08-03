const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150,
    },
    author: String,
    uid: String,
    isComplete: Boolean,
    date: { type: Date, default: new Date() },
});

const appTask = mongoose.model('Task', appSchema);

exports.appTask = appTask;
// module.exports.appTask = appTask;
