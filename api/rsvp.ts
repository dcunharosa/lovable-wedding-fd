import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const data = req.body;
  if (!data?.name || !data?.email || !data?.attending) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let appsScriptOk = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(process.env.APPS_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
      redirect: "manual",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    appsScriptOk = response.status === 302 || response.status === 200;
  } catch {
    appsScriptOk = false;
  }

  if (appsScriptOk) {
    return res.status(200).json({ result: "success" });
  }

  // --- FALLBACK: Apps Script is unreachable ---
  try {
    await Promise.all([
      sendFallbackNotification(data),
      sendGuestConfirmation(data),
    ]);
  } catch (err) {
    console.error("Fallback email failed for:", data.name, data.email, err);
  }

  return res.status(200).json({ result: "success", fallback: true });
}

async function sendFallbackNotification(data: Record<string, string>) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Filipa & Duarte <hello@filipaeduarte.pt>",
      to: ["duarte.cunharosa@gmail.com"],
      subject: `[RSVP FALLBACK] ${data.name} — ${data.attending}`,
      text: [
        "Apps Script was unreachable. RSVP submitted via fallback.",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Attending: ${data.attending}`,
        `Guests: ${data.guests || "1"}`,
        `Dietary: ${data.dietary || "None"}`,
        `Message: ${data.message || "None"}`,
        `Language: ${data.lang || "en"}`,
        `Timestamp: ${new Date().toISOString()}`,
        "",
        "ACTION REQUIRED: Manually add this entry to the Google Sheet.",
      ].join("\n"),
    }),
  });
}

async function sendGuestConfirmation(data: Record<string, string>) {
  const lang = data.lang === "pt" ? "pt" : "en";
  const attending = data.attending === "yes";
  const firstName = (data.name || "").split(" ")[0];

  const subject = attending
    ? lang === "pt"
      ? "Mal podemos esperar por te ver! \uD83C\uDF89"
      : "We can\u2019t wait to see you! \uD83C\uDF89"
    : lang === "pt"
      ? "Obrigado por nos avisares \uD83D\uDC9B"
      : "Thank you for letting us know \uD83D\uDC9B";

  const body = attending
    ? lang === "pt"
      ? `Querido/a ${firstName},\n\nMuito obrigado por confirmares! Estamos muito felizes por te ter connosco na celebra\u00e7\u00e3o do nosso casamento.\n\nPara informa\u00e7\u00f5es sobre viagem, alojamento e mais detalhes, visita o nosso website: https://filipaeduarte.pt\n\nCom amor,\nFilipa & Duarte`
      : `Dear ${firstName},\n\nThank you so much for confirming! We\u2019re thrilled that you will be joining us for our wedding celebration.\n\nFor travel, accommodation and more details, visit our website: https://filipaeduarte.pt\n\nWith love,\nFilipa & Duarte`
    : lang === "pt"
      ? `Querido/a ${firstName},\n\nObrigado por nos avisares. Temos muita pena que n\u00e3o possas estar presente, mas compreendemos perfeitamente. Vamos pensar em ti nesse dia!\n\nCom amor,\nFilipa & Duarte`
      : `Dear ${firstName},\n\nThank you for letting us know. We\u2019re sorry you won\u2019t be able to make it, but we completely understand. You\u2019ll be in our thoughts on the day!\n\nWith love,\nFilipa & Duarte`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Filipa & Duarte <hello@filipaeduarte.pt>",
      to: [data.email],
      reply_to: "duarte.cunharosa@gmail.com",
      subject,
      text: body,
    }),
  });
}
