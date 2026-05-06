const http = require("http");
const https = require("https");
const url = require("url");
const axios = require("axios");

const PORT = process.env.PORT || 3000;


const sendCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};


const USER = "Luke.Niessen";
const PASS = "NCG2024!";
const CLIENT = "NCG";

let sessionId = null;

async function login() {
  const res = await axios.post(
    "https://api.webuntis.com/WebUntis/jsonrpc.do",
    {
      id: "1",
      method: "authenticate",
      params: {
        user: USER,
        password: PASS,
        client: CLIENT
      }
    }
  );

  sessionId = res.data.result.sessionId;
  console.log("WebUntis logged in");
}


const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

 
  if (req.method === "OPTIONS") {
    sendCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }


  if (parsedUrl.pathname === "/proxy") {
    const target = parsedUrl.query.url;

    if (!target) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Missing url parameter");
      return;
    }

    const targetUrl = url.parse(target);
    const client = targetUrl.protocol === "https:" ? https : http;

    const proxyReq = client.get(target, (proxyRes) => {
      sendCorsHeaders(res);
      res.writeHead(proxyRes.statusCode || 502, {
        "Content-Type": proxyRes.headers["content-type"] || "application/octet-stream"
      });

      proxyRes.pipe(res);
    });

    proxyReq.on("error", (err) => {
      sendCorsHeaders(res);
      res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Proxy error: " + err.message);
    });

    return;
  }


  if (parsedUrl.pathname === "/api/vertretung") {
    try {
      sendCorsHeaders(res);

      if (!sessionId) await login();

      const response = await axios.post(
        "https://api.webuntis.com/WebUntis/jsonrpc.do",
        {
          id: "2",
          method: "getSubstitutions",
          params: {
            startDate: 20260506,
            endDate: 20260506
          }
        },
        {
          headers: {
            Cookie: `JSESSIONID=${sessionId}`
          }
        }
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response.data.result));

    } catch (err) {
      console.error(err.message);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("WebUntis error");
    }

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});


server.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});