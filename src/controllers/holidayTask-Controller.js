// src/controllers/holidayTask-Controller.js

const express = require('express');
const router = express.Router();
const HolidayTasks = require('../models/HolidayTasks');

// GET all holiday tasks
const getAllHolidayTasks = async (req, res) => {
    try {
        const h_tasks = await HolidayTasks.find(); 
        res.json(h_tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new holiday task
const createHolidayTask = async (req, res) => {
    const h_task = new HolidayTasks(req.body);
    try {
        const savedHolidayTask = await h_task.save(); 
        res.status(201).json(savedHolidayTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT (update) a holiday task by ID
const updateHolidayTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await HolidayTasks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a holiday task by ID
const deleteHolidayTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await HolidayTasks.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllHolidayTasks,
    createHolidayTask,
    updateHolidayTask,   
    deleteHolidayTask    
};
