module.exports = {
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
      name: 'body',
      type: 'string',
      label: 'Text',
      textarea: true
    },
    {
      name: 'image',
      type: 'string',
      label: 'Hauptbild URL',
      required: false
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Weitere Bilder (URLs)',
      fields: {
        add: {
          name: 'url',
          type: 'string',
          label: 'Bild URL'
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'content',
      label: 'Inhalt',
      fields: [
        'title',
        'slug',
        'published',
        'date',
        'image',
        'body'
      ]
    },
    {
      name: 'gallery',
      label: 'Galerie',
      fields: ['photos']
    }
  ]
};
