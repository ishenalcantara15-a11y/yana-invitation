YANA PAULINE — BIRTHDAY & BAPTISM INVITATION
=============================================

FILES
- index.html: website content
- css/style.css: colors, layout, responsive design and animations
- js/script.js: opening screen, countdown, mobile menu and RSVP handling
- apps-script.gs: optional Google Sheets RSVP receiver
- images/: add baby photos, Sanrio images and decorations here
- music/: optional music file (not connected yet)

OPEN LOCALLY
1. Extract this ZIP.
2. Open the extracted folder in VS Code.
3. Open index.html in a browser, or use the VS Code Live Server extension.

ADD YANA'S PHOTO
Copy a photo into images/yana/ and name it exactly:
yana-main.jpg

ADD CHARACTER IMAGES
Put transparent PNG files in images/sanrio/ using these exact names:
hello-kitty.png
my-melody.png
kuromi.png
cinnamoroll.png
pompompurin.png

The current layout has sample emoji decorations and photo placeholders until you add your own image files.

EVENT DETAILS ALREADY ENTERED
Name: Yana Pauline
Date: December 20, 2026
Time: 11:00 AM (Philippines time)
Venue: Zone 6, Sta. Lucia, San Miguel, Bulacan
Church: To be announced
Attire: Anything that makes guests comfortable

IMPORTANT RSVP NOTE
Until you connect Google Apps Script, the RSVP form only saves a demo response in the browser/device that submitted it. It does NOT collect responses from all guests.
To enable shared online responses:
1. Create a Google Sheet.
2. Open Extensions > Apps Script.
3. Copy the code from apps-script.gs into the editor and save.
4. Deploy > New deployment > Web app.
5. Set Execute as: Me; Who has access: Anyone.
6. Deploy and copy the Web app URL ending in /exec.
7. In js/script.js, set:
   const RSVP_ENDPOINT = "PASTE_YOUR_WEB_APP_URL_HERE";
8. Save and republish your website.

PUBLIC HOSTING
For a public static website, GitHub Pages is a free option:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
Upload the contents of this folder to a public GitHub repository and enable Pages in repository Settings.
Test the published link on a phone and computer before sharing.

MAP NOTE
The venue map opens a Google Maps search for the supplied address. Check the pin carefully; the address may not point to the exact property. Replace the map query and directions URL in index.html with the precise Google Maps pin when you have it.
The church map is intentionally a placeholder until the church is announced.

MUSIC
Music is not enabled by default. Browsers often block autoplay; if adding music, use a visible play/pause control and make sure you have permission to use the audio.
