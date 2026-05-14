#!/usr/bin/env node

/**
 * Migrate articles from components/articles.json to ApostropheCMS
 * Run: node scripts/migrate-articles.js
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const ARTICLES_FILE = path.join(__dirname, '..', 'components', 'articles.json');
const APOS_URL = process.env.BASE_URL || 'http://localhost:3001';
const APOS_TOKEN = process.env.APOS_BEARER_TOKEN;

if (!APOS_TOKEN) {
  console.error('❌ APOS_BEARER_TOKEN not set in .env');
  process.exit(1);
}

async function migrate() {
  console.log('🔄 Starting article migration...');

  // Check if articles file exists
  if (!fs.existsSync(ARTICLES_FILE)) {
    console.log('⚠️  No articles.json found');
    return;
  }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'));
  console.log(`📄 Found ${articles.length} articles to migrate`);

  for (const article of articles) {
    try {
      const cmsArticle = {
        title: article.title,
        slug: article.id,
        published: new Date().toISOString(),
        body: article.text,
        date: article.date || '',
        image: article.image || '',
        photos: (article.photos || []).map(url => ({ url }))
      };

      const response = await axios.post(
        `${APOS_URL}/api/v1/article`,
        cmsArticle,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APOS_TOKEN}`
          }
        }
      );

      console.log(`✅ Imported: ${article.title} (ID: ${response.data._id})`);
    } catch (err) {
      console.error(`❌ Failed to import: ${article.title}`);
      console.error(err.response?.data || err.message);
    }
  }

  console.log('✨ Migration complete!');
}

migrate().catch(console.error);
