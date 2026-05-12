# NCG Website mit ApostropheCMS

## Installation

```bash
npm install
```

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

## ApostropheCMS Integration

Die Integration ist so konzipiert, dass:

1. **Bestehende Frontend bleibt unverändert** - Ihre `index.html` und alle statischen Inhalte funktionieren weiter
2. **Bestehende API-Endpunkte bleiben aktiv** - `/api/articles` wird weiterhin unterstützt
3. **ApostropheCMS läuft separat** - Das Admin-Interface ist unter Port 3001 erreichbar

## Datenmigration

Um bestehende Artikel aus `components/articles.json` nach ApostropheCMS zu migrieren:

1. Starten Sie ApostropheCMS (`npm run cms`)
2. Loggen Sie sich im Admin-Interface ein
3. Artikel können manuell erstellt oder über die API importiert werden

## Struktur

```
apos/
├── app.js          # ApostropheCMS Konfiguration
├── server.js       # CMS Server Start
└── lib/modules/
    └── apostrophe-articles/  # Artikel-Piece Modul
```

## Umgebungsvariablen (.env)

```
ADMIN_HASH=Admin234987s20873kl29820
MONGODB_URI=mongodb://localhost:27017/ncg-website
BASE_URL=http://localhost:3001
```