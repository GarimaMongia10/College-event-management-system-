const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const authLog = path.join(logDir, 'auth.log');

function logAuthAttempt(entry) {
  const line = `[${new Date().toISOString()}] ${entry}\n`;
  fs.appendFile(authLog, line, (err) => {
    if (err) console.error('Failed to write auth log', err);
  });
}

module.exports = { logAuthAttempt };