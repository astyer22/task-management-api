// src/routes/tasksRoutes.js
const express = require('express');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const isAuthenticated = require('../utils/isAuthenticated');  // Authentication middleware

const router = express.Router();

// Define routes that require authentication
router.get('/Tasks', isAuthenticated, getAllTasks);
router.post('/Tasks', isAuthenticated, createTask);
router.put('/Tasks/:id', isAuthenticated, updateTask);
router.delete('/Tasks/:id', isAuthenticated, deleteTask);

module.exports = router;
