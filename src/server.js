const express = require('express');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');  // For API requests
const cors = require('cors');   // Import cors middleware
const connectDB = require('./db/database');
const taskRoutes = require('./routes/tasksRoutes');
const holidayTaskRoutes = require('./routes/holidayTasks-Routes');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
require('dotenv').config();
require('./utils/passport');  // Initialize passport strategies

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware for parsing JSON requests
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from Swagger UI domain
  credentials: true,               // Allow cookies (for session-based authentication)
};
app.use(cors(corsOptions));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Callback
app.get(
  '/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Store GitHub token securely in session
    req.session.github_token = req.user.accessToken;
    res.redirect('/swagger-ui');  // Redirect after successful auth
  }
);

// Routes
app.use('/', authRoutes); // Authentication routes
app.use('/tasks', taskRoutes); // Task routes (protected)
app.use('/holidayTasks', holidayTaskRoutes); // Holiday Task routes (protected)

// Swagger UI with Token Injection
app.use('/swagger-ui', (req, res) => {
  const token = req.session.github_token;

  if (token) {
    // Dynamically generate Swagger UI with injected token
    res.send(`
      <html>
        <head>
          <title>Swagger UI</title>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui-dist/3.52.5/swagger-ui.css">
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui-dist/3.52.5/swagger-ui-bundle.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui-dist/3.52.5/swagger-ui-standalone-preset.js"></script>
          <script>
            window.swaggerUi = SwaggerUIBundle({
              url: "http://localhost:3000/swagger.json",  // Your Swagger JSON path
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.presets.auth
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
             requestInterceptor: (req) => {
              console.log('Injecting Authorization Header:', req);
                req.headers['Authorization'] = 'Bearer ' + "${token}";
                return req;
              }
            });
          </script>
        </body>
      </html>
    `);
  } else {
    // Redirect to login if no token is available
    res.redirect('/login');
  }
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
