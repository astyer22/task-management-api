const crypto = require('crypto');

// Generate a random JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT Secret:', jwtSecret);

// Generate a random session secret
const sessionSecret = crypto.randomBytes(32).toString('hex');
console.log('Generated Session Secret:', sessionSecret);
