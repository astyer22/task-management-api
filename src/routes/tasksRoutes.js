// routes/tasksRoutes.js
const express = require('express');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const isAuthenticated = require('../utils/isAuthenticated');  // Import the auth middleware

const router = express.Router();

// Protected Routes
router.get('/Tasks', isAuthenticated, getAllTasks);  // Requires Authentication
router.post('/Tasks', createTask);
router.put('/Tasks/:id', updateTask);
router.delete('/Tasks/:id', deleteTask);  

module.exports = router;
