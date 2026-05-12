const mongoose = require('mongoose');

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ncg-website'
  }
};