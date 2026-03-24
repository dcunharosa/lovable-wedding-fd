/**
 * Google Apps Script — RSVP backend + admin API for the wedding site.
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file into the script editor (replace any existing code)
 * 4. Set ADMIN_SECRET below to a random string (same value goes in Vercel env vars)
 * 5. Run "setupHeaders" once (it adds column headers to row 1)
 * 6. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy the deployment URL into your .env as VITE_RSVP_ENDPOINT
 *    and into Vercel env vars as APPS_SCRIPT_URL
 *
 * IMPORTANT: After making changes, you must create a NEW deployment version
 * (Deploy → Manage deployments → Edit → New version) for changes to take effect.
 */

var ADMIN_SECRET = "CHANGE_ME_TO_A_RANDOM_STRING";

// ---------------------------------------------------------------------------
// Public: RSVP form submission
// Admin: updateGuest, sendEmail (requires secret)
// ---------------------------------------------------------------------------
function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  // Admin actions require secret
  if (data.action) {
    if (data.secret !== ADMIN_SECRET) {
      return _json({ error: "Unauthorized" });
    }

    if (data.action === "updateGuest") {
      return _updateGuest(data);
    }
    if (data.action === "sendEmail") {
      return _sendEmail(data);
    }
    if (data.action === "deleteGuest") {
      return _deleteGuest(data);
    }
    return _json({ error: "Unknown action" });
  }

  // Public RSVP submission (no action field)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.attending,
    data.guests || "",
    data.dietary || "",
    data.message || "",
  ]);

  return _json({ result: "success" });
}

// ---------------------------------------------------------------------------
// Admin: fetch all guests (requires secret query param)
// ---------------------------------------------------------------------------
function doGet(e) {
  if (e.parameter.secret !== ADMIN_SECRET) {
    return _json({ error: "Unauthorized" });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return _json({ guests: [] });
  }

  var headers = data[0];
  var guests = [];
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j].toLowerCase()] = data[i][j];
    }
    row._row = i + 1; // 1-indexed sheet row number (for updates)
    guests.push(row);
  }

  return _json({ guests: guests });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------
function _updateGuest(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = data.row; // 1-indexed sheet row

  if (!row || row < 2) {
    return _json({ error: "Invalid row" });
  }

  // Columns: A=Timestamp, B=Name, C=Email, D=Attending, E=Guests, F=Dietary, G=Message
  sheet.getRange(row, 2).setValue(data.name);
  sheet.getRange(row, 3).setValue(data.email);
  sheet.getRange(row, 4).setValue(data.attending);
  sheet.getRange(row, 5).setValue(data.guests || "");
  sheet.getRange(row, 6).setValue(data.dietary || "");
  sheet.getRange(row, 7).setValue(data.message || "");

  return _json({ result: "success" });
}

function _deleteGuest(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = data.row; // 1-indexed sheet row

  if (!row || row < 2) {
    return _json({ error: "Invalid row" });
  }

  sheet.deleteRow(row);
  return _json({ result: "success" });
}

function _sendEmail(data) {
  var recipients = data.recipients; // array of email addresses
  var subject = data.subject;
  var body = data.body;

  if (!recipients || !recipients.length || !subject || !body) {
    return _json({ error: "Missing recipients, subject, or body" });
  }

  var sent = 0;
  for (var i = 0; i < recipients.length; i++) {
    try {
      MailApp.sendEmail(recipients[i], subject, body);
      sent++;
    } catch (err) {
      // Skip invalid emails, continue sending to others
    }
  }

  return _json({ result: "success", sent: sent, total: recipients.length });
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Run this once to add column headers to the sheet. */
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet
    .getRange(1, 1, 1, 7)
    .setValues([
      ["Timestamp", "Name", "Email", "Attending", "Guests", "Dietary", "Message"],
    ]);
}
