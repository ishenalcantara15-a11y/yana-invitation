/*
  GOOGLE APPS SCRIPT RSVP RECEIVER
  1. Create a Google Sheet.
  2. Extensions > Apps Script.
  3. Replace the editor contents with this code and Save.
  4. Deploy > New deployment > Web app.
  5. Execute as: Me. Who has access: Anyone.
  6. Deploy, authorize, copy the Web app URL ending in /exec.
  7. Paste that URL into RSVP_ENDPOINT in js/script.js.
  Note: Google may show an authorization warning during your own setup.
*/
const SHEET_NAME = "RSVP Responses";

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const payload = JSON.parse(e.postData.contents || "{}");
  sheet.appendRow([
    new Date(),
    payload.guestName || "",
    payload.attendance || "",
    Number(payload.guestCount || 0),
    payload.guestMessage || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({result:"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput("Yana Pauline RSVP endpoint is ready.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp","Guest Name","Attending?","Number of Guests","Message to Yana"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
