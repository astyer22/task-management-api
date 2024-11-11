const express = require('express');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');
const cors = require('cors');  // Import cors package
const connectDB = require('./db/database');
const taskRoutes = require('./routes/tasksRoutes');
const holidayTaskRoutes = require('./routes/holidayTasks-Routes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./utils/passport');  // Initialize passport strategies

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());  // This will allow all origins, or you can configure it for specific origins

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // Persist session for authentication

// GitHub OAuth callback route
app.get('/api/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        'Accept': 'application/json',
      },
    });

    const { access_token } = response.data;

    if (!access_token) {
      return res.status(500).send('Failed to get GitHub access token');
    }

    req.session.github_token = access_token;
    res.redirect('/swagger-ui');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during GitHub OAuth token exchange');
  }
});

// Routes
app.use('/', authRoutes);  // Authentication routes
app.use('/tasks', taskRoutes);  // Task routes (protected)
app.use('/holidayTasks', holidayTaskRoutes);  // Holiday Task routes (protected)

// Swagger API Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
