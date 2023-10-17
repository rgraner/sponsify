// Handle an error occurred during the checkout call: ReferenceError: fetch is not defined
// 1-npm install node-fetch
// 2-Create a file (e.g., fetchWrapper.js)
// 3-Then, in your code that uses fetch: const fetch = require('./fetchWrapper');
const fetch = require('node-fetch');
module.exports = fetch;