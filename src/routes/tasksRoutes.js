// routes/tasksRoutes.js
const express = require('express');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const isAuthenticated = require('../utils/isAuthenticated');  // Import the auth middleware

const router = express.Router();

// Protected Routes
router.get('/Tasks', isAuthenticated, getAllTasks);  // Requires Authentication
router.post('/Tasks', createTask); // Public Route
router.put('/Tasks/:id', updateTask); // Public Route
router.delete('/Tasks/:id', isAuthenticated, deleteTask);  // Requires Authentication

module.exports = router;
