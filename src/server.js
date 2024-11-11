const express = require('express');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');  // Import axios for API requests
const connectDB = require('./db/database');
const taskRoutes = require('./routes/tasksRoutes');
const holidayTaskRoutes = require('./routes/holidayTasks-Routes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
require('dotenv').config();
require('./utils/passport');  // Initialize passport strategies

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

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
  const { code } = req.query; // Get the code from the query params

  try {
    // Exchange the code for an access token
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        'Accept': 'application/json',
      },
    });

    const { access_token } = response.data;  // GitHub will return the access token

    if (!access_token) {
      return res.status(500).send('Failed to get GitHub access token');
    }

    // Store the access token in session or a secure cookie
    req.session.github_token = access_token;

    // Redirect the user back to Swagger UI (or your desired page)
    res.redirect('/swagger-ui');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during GitHub OAuth token exchange');
  }
});

// Routes
app.use('/', authRoutes); // Authentication routes
app.use('/tasks', taskRoutes); // Task routes (protected)
app.use('/holidayTasks', holidayTaskRoutes); // Holiday Task routes (protected)

// Swagger API Documentation with Token Injection
app.use('/swagger-ui', (req, res) => {
  const token = req.session.github_token; // Retrieve token from session

  if (token) {
    // Dynamically generate Swagger UI with the token injected into the requestInterceptor
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
                req.headers['Authorization'] = 'Bearer ' + "${token}";  // Inject token into the header
                return req;
              }
            });
          </script>
        </body>
      </html>
    `);
  } else {
    // If no token, redirect to login or another page
    res.redirect('/login');
  }
});

// Swagger API Documentation Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
