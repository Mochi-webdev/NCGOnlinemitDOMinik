# NCG Website mit ApostropheCMS

## Installation

```bash
npm install
```

## Konfiguration

1. Kopiere `.env.example` nach `.env`:
```bash
cp .env.example .env
```

2. Passe die Umgebungsvariablen an:
   - `MONGODB_URI`: MongoDB Verbindungsstring (benötigt laufende MongoDB)
   - `APOS_BEARER_TOKEN`: API-Token für ApostropheCMS (über Admin -> API Keys generieren)
   - `BASE_URL`: URL des CMS-Servers (Standard: http://localhost:3001)

## Starten

### Haupt-Website (bestehende statische Website)
```bash
npm start
# läuft auf http://localhost:3000
```

### ApostropheCMS Admin
```bash
npm run cms
# läuft auf http://localhost:3001/admin
```

## Integration

Die Integration ist so konzipiert, dass:

1. **Bestehendes Frontend bleibt** - `index.html` und statische Inhalte funktionieren weiter
2. **Automatischer Fallback** - API-Endpunkte fragen zuerst ApostropheCMS ab, dann lokale JSON
3. **ApostropheCMS als Hauptquelle** - Artikel werden im CMS verwaltet
4. **Backward Compatibility** - Alte Artikel aus `components/articles.json` werden importiert

## API-Endpunkte

- `GET /api/articles` - Liste aller Artikel (aus CMS oder Fallback)
- `POST /api/articles` - Speichert Artikel (sync zu CMS + lokale JSON)
- `GET /article/:slug` - Einzelne Artikelseite (CMS oder Fallback)

## Artikel migrieren

Bestehende Artikel aus `components/articles.json` in ApostropheCMS importieren:

```bash
node scripts/migrate-articles.js
```

## Struktur

```
apos/
├── app.js                    # ApostropheCMS Konfiguration (CORS, API)
├── server.js                 # CMS Server Start
└── lib/modules/apostrophe-articles/
    ├── index.js              # Moduldefinition (Piece)
    └── views/
        ├── show.html         # öffentliche Artikelseite
        └── edit.html         # Admin Bearbeitungsansicht

scripts/
└── migrate-articles.js       # migrationsskript
```

## Datenbank

MongoDB muss laufen:
```bash
mongod
# oder mit Docker:
docker run -d -p 27017:27017 mongo:latest
```

## Admin Zugriff

1. Starte CMS: `npm run cms`
2. Öffne http://localhost:3001/admin
3. Standard-Login wird beim ersten Start erstellt
4. API Keys generieren unter: Admin -> API Keys
5. Token in `.env` als `APOS_BEARER_TOKEN` eintragen

## Umgebungsvariablen (.env)

```env
# Server
PORT=3000
ADMIN_HASH=Admin234987s20873kl29820

# Untis API
UNTIS_URL=https://api.webuntis.com
UNTIS_USER=ihr_benutzername
UNTIS_PASS=ihr_passwort
UNTIS_CLIENT=NCG

# ApostropheCMS
CMS_PORT=3001
BASE_URL=http://localhost:3001
MONGODB_URI=mongodb://localhost:27017/ncg-website
APOS_BEARER_TOKEN=generierter_api_token
```