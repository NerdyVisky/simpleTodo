const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task_name : {
        type: String,
        required: "Task name cannot be blank!"
    },
    created_on : {
        type: String,
        default: Date()
    },
    isPending : {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Todos', todoSchema);