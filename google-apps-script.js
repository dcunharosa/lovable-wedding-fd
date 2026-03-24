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
var RESEND_API_KEY = "CHANGE_ME_TO_YOUR_RESEND_API_KEY";
var EMAIL_FROM = "Filipa & Duarte <hello@yourdomain.com>"; // Update with your verified Resend domain

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

  // Auto-send confirmation email via Resend
  if (data.email) {
    try {
      _sendConfirmationEmail(data);
    } catch (err) {
      // Don't fail the RSVP if email fails
    }
  }

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

// ---------------------------------------------------------------------------
// RSVP confirmation email via Resend
// ---------------------------------------------------------------------------
function _sendConfirmationEmail(data) {
  var firstName = (data.name || "").split(" ")[0];
  var attending = data.attending === "yes";
  var subject = attending
    ? "We can't wait to see you! 🎉"
    : "Thank you for letting us know 💛";
  var html = attending
    ? _attendingEmailHtml(firstName, data.guests || "1")
    : _decliningEmailHtml(firstName);

  UrlFetchApp.fetch("https://api.resend.com/emails", {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + RESEND_API_KEY },
    payload: JSON.stringify({
      from: EMAIL_FROM,
      to: [data.email],
      subject: subject,
      html: html,
    }),
  });
}

function _attendingEmailHtml(name, guests) {
  return '<!DOCTYPE html>'
    + '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Georgia,\'Times New Roman\',serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 20px;">'
    + '<tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'
    // Header
    + '<tr><td style="background-color:#8e9cc0;padding:50px 40px;text-align:center;border-radius:12px 12px 0 0;">'
    + '<p style="margin:0 0 8px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.7);">RSVP Confirmed</p>'
    + '<h1 style="margin:0;font-size:36px;font-weight:300;color:#ffffff;line-height:1.2;">See You in Comporta!</h1>'
    + '</td></tr>'
    // Body
    + '<tr><td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0 0 20px;font-size:18px;color:#4a4a4a;line-height:1.6;">Dear ' + name + ',</p>'
    + '<p style="margin:0 0 20px;font-size:16px;color:#666;line-height:1.6;">Thank you so much for confirming! We\'re thrilled that you' + (guests === "2" ? ' and your guest' : '') + ' will be joining us for our wedding celebration.</p>'
    // Event details card
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f6f3;border-radius:8px;margin:24px 0;">'
    + '<tr><td style="padding:24px;">'
    + '<p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8e9cc0;">The Wedding</p>'
    + '<p style="margin:0 0 16px;font-size:20px;color:#333;font-weight:300;">Saturday, September 12, 2026</p>'
    + '<p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8e9cc0;">Ceremony</p>'
    + '<p style="margin:0 0 16px;font-size:16px;color:#333;">1:00 PM &mdash; Please arrive by 12:30</p>'
    + '<p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8e9cc0;">Venue</p>'
    + '<p style="margin:0 0 16px;font-size:16px;color:#333;">Monte da V&aacute;rzea, Comporta</p>'
    + '<p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8e9cc0;">Dress Code</p>'
    + '<p style="margin:0;font-size:16px;color:#333;">Beach Chic &mdash; think linen &amp; light fabrics</p>'
    + '</td></tr></table>'
    + '<p style="margin:0 0 20px;font-size:16px;color:#666;line-height:1.6;">We\'ll share more details on travel and accommodation on our website. If you have any questions, don\'t hesitate to reach out!</p>'
    // CTA button
    + '<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:8px 0 16px;">'
    + '<a href="https://filipaandduarte.com" style="display:inline-block;background-color:#8e9cc0;color:#ffffff;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;border-radius:4px;">Visit Our Website</a>'
    + '</td></tr></table>'
    + '<p style="margin:16px 0 0;font-size:16px;color:#666;">With love,<br><em>Filipa &amp; Duarte</em></p>'
    + '</td></tr>'
    // Footer
    + '<tr><td style="padding:24px;text-align:center;">'
    + '<p style="margin:0;font-size:13px;color:#999;">Filipa &amp; Duarte &middot; September 12, 2026 &middot; Comporta, Portugal</p>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

function _decliningEmailHtml(name) {
  return '<!DOCTYPE html>'
    + '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Georgia,\'Times New Roman\',serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 20px;">'
    + '<tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'
    // Header
    + '<tr><td style="background-color:#8e9cc0;padding:50px 40px;text-align:center;border-radius:12px 12px 0 0;">'
    + '<p style="margin:0 0 8px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.7);">RSVP Received</p>'
    + '<h1 style="margin:0;font-size:36px;font-weight:300;color:#ffffff;line-height:1.2;">We\'ll Miss You</h1>'
    + '</td></tr>'
    // Body
    + '<tr><td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0 0 20px;font-size:18px;color:#4a4a4a;line-height:1.6;">Dear ' + name + ',</p>'
    + '<p style="margin:0 0 20px;font-size:16px;color:#666;line-height:1.6;">Thank you for letting us know. We\'re sorry you won\'t be able to make it, but we completely understand. You\'ll be in our thoughts on the day!</p>'
    + '<p style="margin:0 0 20px;font-size:16px;color:#666;line-height:1.6;">We\'d love to celebrate with you another time.</p>'
    + '<p style="margin:16px 0 0;font-size:16px;color:#666;">With love,<br><em>Filipa &amp; Duarte</em></p>'
    + '</td></tr>'
    // Footer
    + '<tr><td style="padding:24px;text-align:center;">'
    + '<p style="margin:0;font-size:13px;color:#999;">Filipa &amp; Duarte &middot; September 12, 2026 &middot; Comporta, Portugal</p>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
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
