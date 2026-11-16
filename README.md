# Finanzen

Persönliches Finanz-Dashboard als installierbare Web-App: Bank-Exporte (CSV) importieren, Ausgaben nach Kategorie auswerten, Limits setzen, Depot aus dem Trade-Republic-Export analysieren.

Die App besteht nur aus statischen Dateien und braucht keinen Server. Alle Daten bleiben im Browser des jeweiligen Geräts; nichts wird hochgeladen.

## Auf GitHub Pages veröffentlichen

1. Neues Repository anlegen, z. B. `finanzen`. Mit GitHub Free muss es **öffentlich** sein, damit Pages funktioniert.
2. Alle Dateien aus diesem Ordner ins Repository legen (in die oberste Ebene, nicht in einen Unterordner):

   ```bash
   cd finanzen-app
   git init -b main
   git add .
   git commit -m "Finanzen-App"
   git remote add origin https://github.com/DEIN-NAME/finanzen.git
   git push -u origin main
   ```

   Alternativ auf github.com: **Add file → Upload files** und alle Dateien hineinziehen.
3. Im Repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, Branch `main`, Ordner `/ (root)`, **Save**.
4. Nach etwa einer Minute läuft die App unter `https://DEIN-NAME.github.io/finanzen/`.

## Als App aufs iPhone

1. Die Adresse in **Safari** öffnen.
2. Teilen-Symbol → **Zum Home-Bildschirm**.
3. Die App vom Home-Bildschirm starten und **dort** die Exporte importieren. Die installierte App hat einen eigenen Speicher, getrennt von Safari.

Android: in Chrome das Menü öffnen → **App installieren**.

Nach dem ersten Start funktioniert die App auch ohne Internet.

## Daten und Datenschutz

- Die Seite ist öffentlich erreichbar, enthält aber keine Daten. Umsätze, Limits und Zuordnungen liegen nur auf dem Gerät, auf dem du sie importierst.
- Handy und Mac teilen sich die Daten nicht automatisch. Im Tab **Daten → Sicherung** kannst du alles als Datei speichern und auf einem anderen Gerät einspielen.
- **Lege niemals Bank-Exporte oder Sicherungen ins Repository.** Die `.gitignore` schließt `*.csv` und `finanzen-sicherung-*.json` aus.

## Aktualisieren

`index.html` ersetzen und pushen. Die App holt sich die neue Version beim nächsten Öffnen mit Internetverbindung; bei der installierten App kann ein zweites Öffnen nötig sein.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die komplette App |
| `manifest.webmanifest` | Name, Icon und Startverhalten der installierten App |
| `sw.js` | Offline-Betrieb |
| `icon-*.png`, `apple-touch-icon.png` | App-Icons |
