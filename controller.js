'use strict';

const Task = require('./models/task');

module.exports.list = (req, res) => {
    const tasks = Task.findAll();
    const data = {tasks};
    res.render('index', Object.assign(data, req.commonData));
};

module.exports.create = (req, res) => {
    if (req.body.message != '') {
        var data = {
            text: req.body.message,
            createdAt: Date.now()
        };
        const note = new Task(data);
        note.save();
    }
    const tasks = Task.findAll();
    data = {tasks};
    res.render('index', Object.assign(data, req.commonData));
};

module.exports.update = (req, res) => {
    if (req.body.newText != '') {
        Task.update(req.body.oldText, req.body.newText);
    }
    const tasks = Task.findAll();
    var data = {tasks};
    res.render('index', Object.assign(data, req.commonData));
};

module.exports.delete = (req, res) => {
    Task.deleteTask(req.body.text);
    const tasks = Task.findAll();
    var data = {tasks};
    res.redirect('/');
    //res.render('index', Object.assign(data, req.commonData));
};
