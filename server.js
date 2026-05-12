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

app.get("/api/cms/articles", async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/articles');
        res.json(response.data);
    } catch (err) {
        res.status(503).json({ error: "CMS not available" });
    }
});

app.post("/api/articles", (req, res) => {
    const { articles, adminHash } = req.body;

    if (adminHash !== ADMIN_HASH) {
        return res.status(403).json({ error: "Unauthorized: Invalid admin hash" });
    }

    try {
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