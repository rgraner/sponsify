const crypto = require('crypto');

// Generate a random 256-bit (32-byte) JWT_SECRET
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(secretKey);

