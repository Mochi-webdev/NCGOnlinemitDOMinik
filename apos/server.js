require("dotenv").config();

const apostrophe = require('./app.js');

const PORT = process.env.CMS_PORT || 3001;

apostrophe.listen = function() {
  const server = this.app.listen(PORT, () => {
    console.log(`
===================================
✅ NCG ApostropheCMS läuft
🌍 http://localhost:${PORT}/admin
===================================
    `);
  });
};

module.exports = apostrophe;