require("dotenv").config();

const cors = require('cors');
const express = require('express');

const apostrophe = require('apostrophe')({
  shortName: 'ncg-website',
  baseUrl: process.env.BASE_URL || 'http://localhost:3001',
  modules: {
    'apostrophe-express': {
      middlewares: {
        add: [
          { middleware: cors({ origin: ['http://localhost:3000', process.env.BASE_URL || 'http://localhost:3001'] }) },
          { 
            middleware: express.json(),
            perMethod: { before: ['get', 'post', 'put', 'delete'] }
          }
        ]
      }
    },
    'apostrophe-assets': {},
    'apostrophe-templates': {},
    'apostrophe-pages': {},
    'apostrophe-areas': {},
    'apostrophe-rich-text': {},
    'apostrophe-images': {
      enableAltField: true
    },
    'apostrophe-files': {},
    'apostrophe-pieces-pages': {},
    'apostrophe-pieces': {},
    'apostrophe-schemas': {},
    'apostrophe-login': {},
    'apostrophe-articles': {},
    'apostrophe-articles-pages': {
      extend: 'apostrophe-pieces-pages',
      label: 'Artikel-Seite'
    },
    'apostrophe-articles-widgets': {
      extend: 'apostrophe-pieces-widgets'
    }
  }
});

module.exports = apostrophe;