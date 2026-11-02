import { NextResponse } from "next/server";

/**
 * Receives the enquiry form and forwards it to the n8n webhook, so the webhook URL
 * stays on the server (ENQUIRY_WEBHOOK_URL) instead of shipping to every browser.
 */

const LIMITS = { name: 120, email: 200, company: 200, service: 60, message: 5000 } as const;
type Field = keyof typeof LIMITS;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.error("Enquiry: ENQUIRY_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Hidden field that people never see: anything in it came from a bot. Answer as if it
  // worked so the bot moves on.
  if (typeof body["enquiry_ref"] === "string" && body["enquiry_ref"].trim()) {
    return NextResponse.json({ ok: true });
  }

  const field = (name: Field) => {
    const value = body[name];
    return typeof value === "string" ? value.trim() : "";
  };
  const values = {
    name: field("name"),
    email: field("email"),
    company: field("company"),
    service: field("service"),
    message: field("message"),
  };
  const tooLong = (Object.keys(LIMITS) as Field[]).some((name) => values[name].length > LIMITS[name]);
  if (!values.name || !values.company || !values.message || !EMAIL.test(values.email) || tooLong) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // The n8n workflow expects {name, email, industry, problem}; keep that contract.
  const payload = {
    name: values.name,
    email: values.email,
    industry: values.company,
    problem: `Service: ${values.service || "Not sure yet"}\n\n${values.message}`,
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Webhook answered ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry: forwarding failed", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
