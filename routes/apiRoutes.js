const express = require('express');
const router = express.Router();
const TodoList = require('../models/Todos');

router.get('/', (req, res) => {
    TodoList.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err))
});

router.post('/', async (req, res) => {
    const newTask = new TodoList({
        task_name : req.body.task_name,
        of_project : req.body.of_project,
        created_on : req.body.created_on,
        deadline : req.body.deadline,
        isPending : req.body.isPending
    })
    try{
      await newTask.save();
      res.status(201);
      res.json(req.body);
    }catch(err){
      res.send(err);
    }
})

router.get('/:id', (req, res) => {
    TodoList.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.send(err))
})

router.put('/:id', (req, res) => {
    TodoList.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedTask => res.json(updatedTask))
    .catch(err => res.send(err))
})

router.delete('/:id', (req, res) => {
    TodoList.findByIdAndDelete(req.params.id)
    .then(() => res.send("Task deleted succesfully"))
    .catch(err => res.send(err))
})
module.exports = router;