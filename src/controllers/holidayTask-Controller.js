// controllers/holidayTask-Controller.js

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

module.exports = { getAllHolidayTasks, createHolidayTask }; // Export the functions
