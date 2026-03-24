import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const password = req.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const response = await fetch(process.env.APPS_SCRIPT_URL!, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      ...req.body,
      action: "deleteGuest",
      secret: process.env.APPS_SCRIPT_SECRET,
    }),
    redirect: "manual",
  });

  // Apps Script POSTs execute before returning a 302 redirect.
  // The redirect target returns HTML, not JSON, so we treat 302 as success.
  if (response.status === 302 || response.status === 200) {
    return res.status(200).json({ result: "success" });
  }
  return res.status(502).json({ error: "Apps Script request failed" });
}
