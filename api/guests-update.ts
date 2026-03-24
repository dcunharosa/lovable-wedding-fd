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
      action: "updateGuest",
      secret: process.env.APPS_SCRIPT_SECRET,
    }),
    redirect: "follow",
  });

  const data = await response.json();
  return res.status(200).json(data);
}
