// controllers/taskController.js

const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks'); 

// GET all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find(); 
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new task
const createTask = async (req, res) => {
    const task = new Tasks(req.body);
    try {
        const savedTask = await task.save(); 
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getAllTasks, createTask }; 
