// src/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Management API',
    description: 'API for managing tasks',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './src/routes/tasksRoutes.js', 
  './src/routes/holidayTasks-Routes.js' 
];

// Generate the swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js'); // Start the server
});
