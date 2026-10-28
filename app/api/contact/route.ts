import { checkBotId } from "botid/server";
import { buildContactEmail, isSpam, parseContactInput, validateContact } from "@/lib/contact";
import { createRateLimiter } from "@/lib/rateLimit";
import { checkRequestShape, guardStatus, maxBodyBytes } from "@/lib/requestGuard";
import { person } from "@/lib/site";

// Last line of defense: per instance only. The shared limit is a Vercel Firewall rule.
const allow = createRateLimiter(5, 60 * 60 * 1000);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const guardError = checkRequestShape({
    origin: request.headers.get("origin"),
    host: request.headers.get("host"),
    contentType: request.headers.get("content-type"),
    contentLength: request.headers.get("content-length"),
  });
  if (guardError) {
    return Response.json({ error: guardError }, { status: guardStatus[guardError] });
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    return Response.json({ error: "bot" }, { status: 403 });
  }

  // Content-Length can be absent (chunked body): measure what was actually received.
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > maxBodyBytes) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid", fields: [] }, { status: 400 });
  }

  const input = parseContactInput(body);
  // Bots get the same answer as people, so they learn nothing from the hidden field.
  if (isSpam(input)) return Response.json({ ok: true });

  const result = validateContact(input);
  if (!result.ok) {
    return Response.json({ error: "invalid", fields: result.fields }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const email = buildContactEmail(result.data);
  // Without a verified domain, Resend only delivers to the account owner's address.
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Site Jérémy Geneste <onboarding@resend.dev>",
      to: [person.email],
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status);
    return Response.json({ error: "failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
