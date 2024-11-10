// src/controllers/holidayTask-Controller.js

const express = require('express');
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

// PUT (update) a task by ID
const updateTask = async (req, res) => {
    const { id } = req.params;  
    try {
        const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;  
    try {
        const deletedTask = await Tasks.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,   
    deleteTask    
};
