require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const ADMIN_HASH = process.env.ADMIN_HASH || "Admin234987s20873kl29820";

const ARTICLES_FILE = path.join(__dirname, "components", "articles.json");

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/NCGAdmin.html", (req, res) => {
    res.sendFile(path.join(__dirname, "NCGAdmin.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/faecher", (req, res) => {
    res.sendFile(path.join(__dirname, "Seiten", "Unterricht", "FaecherundFachschaften.html"));
});

app.get("/faecher/biologie", (req, res) => {
    res.sendFile(path.join(__dirname, "Seiten", "Faecher", "biologie.html"));
});

app.get("/faecher/chemie", (req, res) => {
    res.sendFile(path.join(__dirname, "Seiten", "Faecher", "chemie.html"));
});

app.get("/faecher/deutsch", (req, res) => {
    res.sendFile(path.join(__dirname, "Seiten", "Faecher", "deutsch.html"));
});

app.get("/api/articles", async (req, res) => {
    try {
        // First try to fetch from ApostropheCMS
        try {
            const response = await axios.get('http://localhost:3001/api/v1/article', {
                params: {
                    limit: 100,
                    sort: { published: -1 }
                }
            });

            const cmsArticles = (response.data.items || []).map(item => ({
                title: item.title,
                id: item.slug || item._id,
                image: item.image || 'assets/default.jpg',
                text: item.body || '',
                date: item.date || (item.published ? new Date(item.published).toLocaleDateString('de-DE') : ''),
                link: `/article/${item.slug || item._id}`,
                photos: item.photos ? item.photos.map(p => p.url).filter(Boolean) : []
            }));

            if (cmsArticles.length > 0) {
                return res.json(cmsArticles);
            }
        } catch (cmsErr) {
            console.log('ApostropheCMS not available, falling back to local articles');
        }

        // Fallback to local JSON file
        if (!fs.existsSync(ARTICLES_FILE)) {
            return res.json([]);
        }
        const data = fs.readFileSync(ARTICLES_FILE, "utf8");
        res.json(JSON.parse(data));
    } catch (err) {
        console.error("Error reading articles:", err);
        res.status(500).json({ error: "Failed to read articles" });
    }
});

// Article detail page - tries CMS first, falls back to static template
app.get("/article/:slug", async (req, res) => {
    const { slug } = req.params;

    try {
        // Try to fetch from ApostropheCMS
        const response = await axios.get(`http://localhost:3001/api/v1/article/${slug}`);
        const article = response.data;

        if (article) {
            // Convert CMS article to frontend format
            const articleData = {
                title: article.title,
                id: article.slug || article._id,
                image: article.image || 'assets/default.jpg',
                text: article.body || '',
                date: article.date || (article.published ? new Date(article.published).toLocaleDateString('de-DE') : ''),
                photos: article.photos ? article.photos.map(p => p.url).filter(Boolean) : []
            };

            // Read template and inject data
            const templatePath = path.join(__dirname, "Seiten", "UeberUns", "ArtikelTemplate.html");
            let template = fs.readFileSync(templatePath, "utf8");

            // Inject article data as JSON for the frontend script
            const dataScript = `<script>window.ARTICLE_DATA = ${JSON.stringify(articleData)};</script>`;
            template = template.replace('</head>', dataScript + '</head>');

            return res.send(template);
        }
    } catch (cmsErr) {
        console.log('Article not found in CMS, trying fallback');
    }

    // Fallback to static JSON file using query param style
    try {
        if (fs.existsSync(ARTICLES_FILE)) {
            const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, "utf8"));
            const article = articles.find(a => a.id === slug);

            if (article) {
                const templatePath = path.join(__dirname, "Seiten", "UeberUns", "ArtikelTemplate.html");
                let template = fs.readFileSync(templatePath, "utf8");
                const dataScript = `<script>window.ARTICLE_DATA = ${JSON.stringify(article)};</script>`;
                template = template.replace('</head>', dataScript + '</head>');
                return res.send(template);
            }
        }
    } catch (err) {
        console.error("Fallback error:", err);
    }

    res.status(404).send("Artikel nicht gefunden");
});

app.get("/api/cms/articles", async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/article');
        res.json(response.data);
    } catch (err) {
        res.status(503).json({ error: "CMS not available" });
    }
});

app.post("/api/articles", async (req, res) => {
    const { articles, adminHash } = req.body;

    if (adminHash !== ADMIN_HASH) {
        return res.status(403).json({ error: "Unauthorized: Invalid admin hash" });
    }

    try {
        // Try to sync with ApostropheCMS if available
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            if (APOS_BEARER_TOKEN) {
                headers['Authorization'] = 'Bearer ' + APOS_BEARER_TOKEN;
            }

            for (const article of articles) {
                const cmsArticle = {
                    title: article.title,
                    slug: article.id,
                    published: new Date().toISOString(),
                    body: article.text,
                    image: article.image || '',
                    photos: (article.photos || []).map(url => ({ url }))
                };

                await axios.post('http://localhost:3001/api/v1/article', cmsArticle, { headers });
            }
            console.log("✅ Articles synced to ApostropheCMS");
        } catch (cmsErr) {
            console.log('ApostropheCMS sync skipped:', cmsErr.message);
        }

        // Always save to local JSON as backup
        const dir = path.dirname(ARTICLES_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf8");
        console.log("✅ Articles updated by admin");
        res.json({ success: true, message: "Articles saved successfully" });
    } catch (err) {
        console.error("Error writing articles:", err);
        res.status(500).json({ error: "Failed to save articles" });
    }
});

const UNTIS_URL = process.env.UNTIS_URL;
const UNTIS_USER = process.env.UNTIS_USER;
const UNTIS_PASS = process.env.UNTIS_PASS;
const UNTIS_CLIENT = process.env.UNTIS_CLIENT || "NCG";

const APOS_BEARER_TOKEN = process.env.APOS_BEARER_TOKEN;

let sessionId = null;

async function loginToUntis() {
    try {
        const response = await axios.post(
            UNTIS_URL,
            {
                id: "1",
                method: "authenticate",
                params: {
                    user: UNTIS_USER,
                    password: UNTIS_PASS,
                    client: UNTIS_CLIENT
                }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        sessionId = response.data.result.sessionId;
        console.log("✅ WebUntis login successful");
    } catch (err) {
        console.error("❌ WebUntis Login Failed");
        console.error(err.response?.data || err.message);
    }
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return Number(`${year}${month}${day}`);
}

app.get("/api/vertretung", async (req, res) => {
    try {
        if (!sessionId) {
            await loginToUntis();
        }

        const today = getTodayDate();

        const response = await axios.post(
            UNTIS_URL,
            {
                id: "2",
                method: "getSubstitutions",
                params: {
                    startDate: today,
                    endDate: today
                }
            },
            {
                headers: {
                    Cookie: `JSESSIONID=${sessionId}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data.result);

    } catch (err) {
        console.error("❌ Substitution Error");
        console.error(err.response?.data || err.message);

        if (err.response?.data?.error) {
            try {
                console.log("🔄 Re-Logging into WebUntis...");
                await loginToUntis();
                res.status(401).json({
                    error: "Session expired. Retry request."
                });
            } catch {
                res.status(500).json({
                    error: "WebUntis re-login failed"
                });
            }
        } else {
            res.status(500).json({
                error: "Unknown server error"
            });
        }
    }
});

app.get("/proxy", async (req, res) => {
    try {
        const target = req.query.url;
        if (!target) {
            return res.status(400).send("Missing URL parameter");
        }

        const response = await axios.get(target, {
            responseType: "stream"
        });

        res.setHeader("Content-Type", response.headers["content-type"]);
        response.data.pipe(res);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Proxy error");
    }
});

app.use(express.static(__dirname));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => {
    console.log(`
===================================
✅ Server running
🌍 http://localhost:${PORT}
===================================
`);
});