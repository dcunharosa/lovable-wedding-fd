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
var EMAIL_FROM = "Filipa & Duarte <hello@filipaeduarte.pt>"; // Update after verifying domain in Resend
var COUPLE_PHOTO_URL = "https://filipaeduarte.pt/email-hero.jpg"; // Host a ~600px wide couple photo
var WEBSITE_URL = "https://filipaeduarte.pt";
var GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Monte+da+V%C3%A1rzea+Comporta+Portugal";
var GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Filipa+%26+Duarte+%E2%80%94+Wedding&dates=20260912T123000%2F20260913T020000&location=Monte+da+Varzea%2C+Comporta%2C+Portugal&details=Ceremony+at+1pm%2C+cocktail+at+2pm%2C+lunch+%26+party+from+3%3A30pm.&ctz=Europe%2FLisbon";

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
var _copy = {
  en: {
    subjectYes: "We can\u2019t wait to see you! \uD83C\uDF89",
    subjectNo: "Thank you for letting us know \uD83D\uDC9B",
    confirmed: "RSVP Confirmed",
    headerYes: "We Can\u2019t Wait to Celebrate With You!",
    headerNo: "We\u2019ll Miss You",
    received: "RSVP Received",
    dear: "Dear",
    bodyYes: "Thank you so much for confirming! We\u2019re thrilled that you will be joining us for our wedding celebration.",
    bodyYesPlusOne: "Thank you so much for confirming! We\u2019re thrilled that you and your guest will be joining us for our wedding celebration.",
    theWedding: "The Wedding",
    weddingDate: "Saturday, September 12, 2026",
    ceremony: "Ceremony",
    ceremonyTime: "1:00 PM \u2014 Please arrive by 12:30",
    venue: "Venue",
    venueName: "Monte da V\u00e1rzea, Comporta",
    dressCode: "Dress Code",
    dressCodeDesc: "Beach Chic \u2014 think linen & light fabrics",
    moreDetails: "For travel, accommodation and more details, visit our website. If you have any questions, don\u2019t hesitate to reach out!",
    addToCalendar: "Add to Calendar",
    seeOnMaps: "See Venue on Maps",
    visitWebsite: "Visit Our Website",
    withLove: "With love,",
    bodyNo: "Thank you for letting us know. We\u2019re sorry you won\u2019t be able to make it, but we completely understand. You\u2019ll be in our thoughts on the day!",
    bodyNo2: "We\u2019d love to celebrate with you another time.",
    footer: "Filipa & Duarte \u00b7 September 12, 2026 \u00b7 Comporta, Portugal",
  },
  pt: {
    subjectYes: "Mal podemos esperar por te ver! \uD83C\uDF89",
    subjectNo: "Obrigado por nos avisares \uD83D\uDC9B",
    confirmed: "RSVP Confirmado",
    headerYes: "Mal Podemos Esperar por Celebrar Contigo!",
    headerNo: "Vamos Ter Saudades",
    received: "RSVP Recebido",
    dear: "Querido/a",
    bodyYes: "Muito obrigado por confirmares! Estamos muito felizes por te ter connosco na celebra\u00e7\u00e3o do nosso casamento.",
    bodyYesPlusOne: "Muito obrigado por confirmares! Estamos muito felizes por te ter, juntamente com o teu acompanhante, na celebra\u00e7\u00e3o do nosso casamento.",
    theWedding: "O Casamento",
    weddingDate: "S\u00e1bado, 12 de Setembro de 2026",
    ceremony: "Cerim\u00f3nia",
    ceremonyTime: "13:00 \u2014 Chegada at\u00e9 \u00e0s 12:30",
    venue: "Local",
    venueName: "Monte da V\u00e1rzea, Comporta",
    dressCode: "Dress Code",
    dressCodeDesc: "Beach Chic \u2014 pensem em linho e tecidos leves",
    moreDetails: "Para informa\u00e7\u00f5es sobre viagem, alojamento e mais detalhes, visita o nosso website. Se tiveres alguma d\u00favida, n\u00e3o hesites em contactar-nos!",
    addToCalendar: "Adicionar ao Calend\u00e1rio",
    seeOnMaps: "Ver Local no Mapa",
    visitWebsite: "Visitar o Nosso Website",
    withLove: "Com amor,",
    bodyNo: "Obrigado por nos avisares. Temos muita pena que n\u00e3o possas estar presente, mas compreendemos perfeitamente. Vamos pensar em ti nesse dia!",
    bodyNo2: "Adorav\u00edamos celebrar contigo noutra ocasi\u00e3o.",
    footer: "Filipa & Duarte \u00b7 12 de Setembro de 2026 \u00b7 Comporta, Portugal",
  },
};

function _sendConfirmationEmail(data) {
  var lang = data.lang === "pt" ? "pt" : "en";
  var t = _copy[lang];
  var firstName = (data.name || "").split(" ")[0];
  var attending = data.attending === "yes";
  var subject = attending ? t.subjectYes : t.subjectNo;
  var html = attending
    ? _attendingEmailHtml(t, firstName, data.guests || "1")
    : _decliningEmailHtml(t, firstName);
  var text = attending
    ? _attendingEmailText(t, firstName, data.guests || "1")
    : _decliningEmailText(t, firstName);

  UrlFetchApp.fetch("https://api.resend.com/emails", {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + RESEND_API_KEY },
    payload: JSON.stringify({
      from: EMAIL_FROM,
      to: [data.email],
      reply_to: "duarte.cunharosa@gmail.com",
      subject: subject,
      html: html,
      text: text,
    }),
  });
}

// ---------------------------------------------------------------------------
// Plain text email versions (spam-filter friendly fallback)
// ---------------------------------------------------------------------------
function _attendingEmailText(t, name, guests) {
  var bodyText = guests === "2" ? t.bodyYesPlusOne : t.bodyYes;
  return t.confirmed + "\n" + t.headerYes + "\n\n"
    + t.dear + " " + name + ",\n\n"
    + bodyText + "\n\n"
    + "---\n\n"
    + t.theWedding + "\n"
    + t.weddingDate + "\n\n"
    + t.ceremony + "\n"
    + t.ceremonyTime + "\n\n"
    + t.venue + "\n"
    + t.venueName + "\n\n"
    + t.dressCode + "\n"
    + t.dressCodeDesc + "\n\n"
    + "---\n\n"
    + t.moreDetails + "\n\n"
    + t.visitWebsite + ": " + WEBSITE_URL + "\n"
    + t.seeOnMaps + ": " + GOOGLE_MAPS_URL + "\n"
    + t.addToCalendar + ": " + GOOGLE_CALENDAR_URL + "\n\n"
    + t.withLove + "\nFilipa & Duarte\n\n"
    + t.footer;
}

function _decliningEmailText(t, name) {
  return t.received + "\n" + t.headerNo + "\n\n"
    + t.dear + " " + name + ",\n\n"
    + t.bodyNo + "\n\n"
    + t.bodyNo2 + "\n\n"
    + t.visitWebsite + ": " + WEBSITE_URL + "\n\n"
    + t.withLove + "\nFilipa & Duarte\n\n"
    + t.footer;
}

// ---------------------------------------------------------------------------
// Shared HTML helpers
// ---------------------------------------------------------------------------
var _fonts = '<style>@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Josefin+Sans:wght@300;400&display=swap");</style>';
var _displayFont = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
var _bodyFont = "'Josefin Sans',Arial,Helvetica,sans-serif";

function _emailHead() {
  return '<!DOCTYPE html>'
    + '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">'
    + _fonts
    + '</head>';
}

function _emailBody(inner) {
  return '<body style="margin:0;padding:0;background-color:#F5F0EB;-webkit-font-smoothing:antialiased;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F5F0EB;padding:40px 16px;">'
    + '<tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">'
    + inner
    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

function _emailHeader(subtitle, title) {
  return '<tr><td style="background-color:#9CB4E2;padding:48px 40px 44px;text-align:center;border-radius:12px 12px 0 0;">'
    + '<p style="margin:0 0 12px;font-family:' + _bodyFont + ';font-size:11px;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.7);">' + subtitle + '</p>'
    + '<h1 style="margin:0;font-family:' + _displayFont + ';font-size:36px;font-weight:300;color:#ffffff;line-height:1.3;">' + title + '</h1>'
    + '</td></tr>';
}

function _emailFooter(text) {
  return '<tr><td style="padding:28px 24px;text-align:center;">'
    + '<p style="margin:0;font-family:' + _bodyFont + ';font-size:12px;letter-spacing:1px;color:#999;">' + text + '</p>'
    + '</td></tr>';
}

function _emailButton(href, label, primary) {
  var bg = primary ? '#9CB4E2' : '#F5F0EB';
  var color = primary ? '#ffffff' : '#555555';
  return '<a href="' + href + '" target="_blank" style="display:inline-block;background-color:' + bg + ';color:' + color + ';text-decoration:none;font-family:' + _bodyFont + ';font-size:12px;font-weight:400;letter-spacing:2px;text-transform:uppercase;padding:14px 28px;border-radius:4px;mso-padding-alt:0;">' + label + '</a>';
}

// ---------------------------------------------------------------------------
// Attending email
// ---------------------------------------------------------------------------
function _attendingEmailHtml(t, name, guests) {
  var bodyText = guests === "2" ? t.bodyYesPlusOne : t.bodyYes;

  var card = ''
    // Photo
    + '<tr><td style="background-color:#ffffff;padding:0;text-align:center;">'
    + '<img src="' + COUPLE_PHOTO_URL + '" alt="Filipa &amp; Duarte" width="600" style="display:block;width:100%;max-width:600px;height:auto;" />'
    + '</td></tr>'
    // Body
    + '<tr><td style="background-color:#ffffff;padding:36px 40px 0;">'
    + '<p style="margin:0 0 18px;font-family:' + _displayFont + ';font-size:20px;color:#4a4a4a;line-height:1.5;">' + t.dear + ' ' + name + ',</p>'
    + '<p style="margin:0 0 24px;font-family:' + _bodyFont + ';font-size:15px;font-weight:300;color:#666;line-height:1.7;">' + bodyText + '</p>'
    + '</td></tr>'
    // Event details card
    + '<tr><td style="background-color:#ffffff;padding:0 40px;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F8F5F0;border-radius:8px;">'
    + '<tr><td style="padding:28px 28px 24px;">'
    // -- The Wedding
    + '<p style="margin:0 0 4px;font-family:' + _bodyFont + ';font-size:10px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#9CB4E2;">' + t.theWedding + '</p>'
    + '<p style="margin:0 0 20px;font-family:' + _displayFont + ';font-size:22px;font-weight:300;color:#333;line-height:1.3;">' + t.weddingDate + '</p>'
    // -- Ceremony
    + '<p style="margin:0 0 4px;font-family:' + _bodyFont + ';font-size:10px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#9CB4E2;">' + t.ceremony + '</p>'
    + '<p style="margin:0 0 20px;font-family:' + _displayFont + ';font-size:17px;color:#333;">' + t.ceremonyTime + '</p>'
    // -- Venue
    + '<p style="margin:0 0 4px;font-family:' + _bodyFont + ';font-size:10px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#9CB4E2;">' + t.venue + '</p>'
    + '<p style="margin:0 0 20px;font-family:' + _displayFont + ';font-size:17px;color:#333;">' + t.venueName + '</p>'
    // -- Dress Code
    + '<p style="margin:0 0 4px;font-family:' + _bodyFont + ';font-size:10px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#9CB4E2;">' + t.dressCode + '</p>'
    + '<p style="margin:0;font-family:' + _displayFont + ';font-size:17px;color:#333;">' + t.dressCodeDesc + '</p>'
    + '</td></tr></table>'
    + '</td></tr>'
    // More details text
    + '<tr><td style="background-color:#ffffff;padding:24px 40px 0;">'
    + '<p style="margin:0;font-family:' + _bodyFont + ';font-size:15px;font-weight:300;color:#666;line-height:1.7;">' + t.moreDetails + '</p>'
    + '</td></tr>'
    // Calendar + Maps buttons
    + '<tr><td align="center" style="background-color:#ffffff;padding:28px 40px 0;">'
    + '<table cellpadding="0" cellspacing="0" role="presentation"><tr>'
    + '<td style="padding-right:8px;">' + _emailButton(GOOGLE_CALENDAR_URL, t.addToCalendar, false) + '</td>'
    + '<td style="padding-left:8px;">' + _emailButton(GOOGLE_MAPS_URL, t.seeOnMaps, false) + '</td>'
    + '</tr></table>'
    + '</td></tr>'
    // Divider
    + '<tr><td style="background-color:#ffffff;padding:28px 40px 0;">'
    + '<hr style="border:none;border-top:1px solid #e8e4df;margin:0;" />'
    + '</td></tr>'
    // Visit Website CTA
    + '<tr><td align="center" style="background-color:#ffffff;padding:28px 40px 0;">'
    + _emailButton(WEBSITE_URL, t.visitWebsite, true)
    + '</td></tr>'
    // Sign-off
    + '<tr><td style="background-color:#ffffff;padding:28px 40px 36px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0;font-family:' + _displayFont + ';font-size:17px;font-style:italic;color:#666;">' + t.withLove + '<br/>Filipa &amp; Duarte</p>'
    + '</td></tr>';

  return _emailHead() + _emailBody(_emailHeader(t.confirmed, t.headerYes) + card + _emailFooter(t.footer));
}

// ---------------------------------------------------------------------------
// Declining email
// ---------------------------------------------------------------------------
function _decliningEmailHtml(t, name) {
  var card = ''
    // Body
    + '<tr><td style="background-color:#ffffff;padding:40px 40px 0;">'
    + '<p style="margin:0 0 18px;font-family:' + _displayFont + ';font-size:20px;color:#4a4a4a;line-height:1.5;">' + t.dear + ' ' + name + ',</p>'
    + '<p style="margin:0 0 20px;font-family:' + _bodyFont + ';font-size:15px;font-weight:300;color:#666;line-height:1.7;">' + t.bodyNo + '</p>'
    + '<p style="margin:0 0 24px;font-family:' + _bodyFont + ';font-size:15px;font-weight:300;color:#666;line-height:1.7;">' + t.bodyNo2 + '</p>'
    + '</td></tr>'
    // Visit Website CTA
    + '<tr><td align="center" style="background-color:#ffffff;padding:0 40px 8px;">'
    + _emailButton(WEBSITE_URL, t.visitWebsite, true)
    + '</td></tr>'
    // Sign-off
    + '<tr><td style="background-color:#ffffff;padding:28px 40px 36px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0;font-family:' + _displayFont + ';font-size:17px;font-style:italic;color:#666;">' + t.withLove + '<br/>Filipa &amp; Duarte</p>'
    + '</td></tr>';

  return _emailHead() + _emailBody(_emailHeader(t.received, t.headerNo) + card + _emailFooter(t.footer));
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
