import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendEmail({
  to,
  subject,
  html,
  text
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set – email skipped:", subject, "→", to);
    return { id: "mock-" + Date.now(), skipped: true };
  }

  const from = process.env.RESEND_FROM_EMAIL
    ? `${process.env.RESEND_FROM_NAME || "Frame By Frame"} <${process.env.RESEND_FROM_EMAIL}>`
    : "Frame By Frame <onboarding@resend.dev>";

  const result = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text
  });

  return result;
}

export function personalizeTemplate(
  template: string,
  vars: Record<string, string | undefined>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, value || "");
  }
  return result;
}
