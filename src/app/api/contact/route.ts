import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO_EMAIL = "RaysEVService@gmail.com";
// Must be a domain verified in Resend. Falls back to Resend's shared sender
// so the route still works before DNS verification is finished.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Ray's EV Service <onboarding@resend.dev>";

/** Max characters accepted per field — guards against abuse. */
const LIMITS: Record<string, number> = {
  service: 60,
  name: 100,
  phone: 40,
  email: 120,
  model: 30,
  year: 20,
  location: 120,
  faultcodes: 2000,
  issue: 4000,
  contactpref: 30,
};

type Payload = Record<string, unknown>;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

/** Strip CR/LF so nothing can be injected into the subject header. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // ── Honeypot ──────────────────────────────────────────────────────────────
  // Real users never see this field. Bots fill it in. Return 200 so the bot
  // believes it succeeded and doesn't retry with a different strategy.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const f = Object.fromEntries(
    Object.entries(LIMITS).map(([key, max]) => [key, clean(body[key], max)])
  ) as Record<keyof typeof LIMITS, string>;

  // ── Validation ────────────────────────────────────────────────────────────
  const errors: string[] = [];
  if (!f.name) errors.push("Name is required.");
  if (!f.phone) errors.push("Phone is required.");
  if (f.phone && (f.phone.match(/\d/g) ?? []).length < 10) {
    errors.push("Phone number looks incomplete.");
  }
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    errors.push("Email address looks invalid.");
  }
  if (body.warrantyAck !== true) {
    errors.push("Warranty acknowledgment is required.");
  }

  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email is not configured yet. Please call (951) 622-6222." },
      { status: 503 }
    );
  }

  // ── Compose ───────────────────────────────────────────────────────────────
  const vehicle = [f.model, f.year].filter(Boolean).join(" ") || "Not specified";
  const subject = singleLine(
    `Service Request — ${f.service || "Not specified"} — ${vehicle} — ${f.name}`
  );

  const rows: Array<[string, string]> = [
    ["Service needed", f.service || "Not specified"],
    ["Name", f.name],
    ["Phone", f.phone],
    ["Email", f.email || "—"],
    ["Tesla", vehicle],
    ["Location / zip", f.location || "—"],
    ["Preferred contact", f.contactpref || "Phone call"],
  ];

  const text = [
    "Service request from raysevservice.com",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    f.faultcodes ? `Fault codes / alerts:\n${f.faultcodes}` : "",
    f.faultcodes ? "" : "",
    f.issue ? `Issue description:\n${f.issue}` : "",
    "",
    "---",
    "Customer confirmed they reviewed warranty coverage before submitting.",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#1A1A1A;max-width:600px">
      <h2 style="font-size:17px;margin:0 0 4px">New service request</h2>
      <p style="font-size:13px;color:#6B7280;margin:0 0 18px">via raysevservice.com</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:7px 12px 7px 0;color:#6B7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #E5E7EB">${escapeHtml(
              label
            )}</td>
            <td style="padding:7px 0;font-weight:600;border-bottom:1px solid #E5E7EB">${escapeHtml(
              value
            )}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${
        f.faultcodes
          ? `<h3 style="font-size:14px;margin:20px 0 6px">Fault codes / alerts</h3>
             <pre style="font-family:ui-monospace,monospace;font-size:13px;background:#F8F8F6;border:1px solid #E5E7EB;border-radius:6px;padding:11px;white-space:pre-wrap;margin:0">${escapeHtml(
               f.faultcodes
             )}</pre>`
          : ""
      }
      ${
        f.issue
          ? `<h3 style="font-size:14px;margin:20px 0 6px">Issue description</h3>
             <p style="font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0">${escapeHtml(
               f.issue
             )}</p>`
          : ""
      }
      <p style="font-size:12px;color:#6B7280;border-top:1px solid #E5E7EB;margin-top:22px;padding-top:12px">
        Customer confirmed they reviewed warranty coverage before submitting.
      </p>
    </div>`;

  // ── Send ──────────────────────────────────────────────────────────────────
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        text,
        html,
        ...(f.email ? { reply_to: f.email } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error", res.status, detail);
      return NextResponse.json(
        { error: "Could not send right now. Please call (951) 622-6222." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Network error", err);
    return NextResponse.json(
      { error: "Could not send right now. Please call (951) 622-6222." },
      { status: 502 }
    );
  }
}
