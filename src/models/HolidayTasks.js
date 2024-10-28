// src/models/HolidayTask.js
const mongoose = require('mongoose');

const HolidayTaskTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: false },
  subtasks: [{ type: String, required: false }],
  gifts: [{ type: String, required: false }],
  task_for_who: [{ type: String, required: false }],
  category: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('HolidayTasks', HolidayTaskTaskSchema);
