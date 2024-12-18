// routes/tasksRoutes.js
const express = require('express');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const isAuthenticated = require('../utils/isAuthenticated');  // Import the auth middleware

const router = express.Router();

// Protected Routes
router.get('/', isAuthenticated, getAllTasks);  // Requires Authentication
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);  

module.exports = router;
