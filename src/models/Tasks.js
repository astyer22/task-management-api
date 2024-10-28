// src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  due_date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  subtasks: [{ type: String }],
  category: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Tasks', taskSchema, 'tasks');
