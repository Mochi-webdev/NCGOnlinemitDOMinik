require("dotenv").config();

const apostrophe = require('apostrophe')({
  shortName: 'ncg-website',
  baseUrl: process.env.BASE_URL || 'http://localhost:3001',
  modules: {
    'apostrophe-express': {},
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
    'apostrophe-articles': {
      extend: 'apostrophe-pieces',
      name: 'article',
      label: 'Artikel',
      pluralLabel: 'Artikel',
      addFields: [
        {
          name: 'date',
          type: 'string',
          label: 'Datum'
        },
        {
          name: 'photos',
          type: 'array',
          titleField: true,
          fields: {
            add: {
              name: 'photo',
              type: 'area',
              options: {
                widgets: {
                  'apostrophe-images': {}
                }
              }
            }
          }
        }
      ]
    },
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