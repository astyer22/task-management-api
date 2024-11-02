const express = require('express');
const connectDB = require('./db/database');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const taskRoutes = require('./routes/tasksRoutes'); 
const holidayTask_Routes = require('./routes/holidayTasks-Routes');

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); 
app.use('/', taskRoutes); 
app.use('/', holidayTask_Routes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
