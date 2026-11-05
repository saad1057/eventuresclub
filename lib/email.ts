import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { site } from "@/lib/site";

export type BriefField = { label: string; value: string };

type Outgoing = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderBriefHtml(title: string, intro: string, fields: BriefField[]) {
  const rows = fields
    .map(
      (field) => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #D8D1C5;color:#4A453E;font-size:13px;width:34%;vertical-align:top;">${escapeHtml(field.label)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #D8D1C5;color:#1A1714;font-size:15px;vertical-align:top;">${escapeHtml(field.value || "—")}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
  <html>
    <body style="margin:0;background:#F4F0E8;color:#1A1714;font-family:Georgia,'Times New Roman',serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F0E8;padding:32px 16px;">
        <tr><td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr><td style="padding-bottom:18px;font-family:Georgia,serif;font-size:28px;letter-spacing:-0.03em;">eventures <span style="font-size:12px;letter-spacing:0.18em;">CLUB</span></td></tr>
            <tr><td style="font-family:Georgia,serif;font-size:22px;padding-bottom:8px;">${escapeHtml(title)}</td></tr>
            <tr><td style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#4A453E;padding-bottom:18px;">${escapeHtml(intro)}</td></tr>
            <tr><td style="background:#F4F0E8;border:1px solid #D8D1C5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            </td></tr>
            <tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#4A453E;padding-top:18px;">Eventures Club · Lahore · ${escapeHtml(site.email)}</td></tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>`;
}

export function renderBriefText(title: string, intro: string, fields: BriefField[]) {
  const lines = fields.map((field) => `${field.label}: ${field.value || "—"}`);
  return [title, "", intro, "", ...lines, "", `Eventures Club, Lahore`, site.email].join("\n");
}

async function savePreview(message: Outgoing) {
  const dir = path.join(process.cwd(), ".mail-preview");
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(":", "-");
  const base = `${stamp}-${message.to.replaceAll(/[^a-z0-9]+/gi, "-")}`;
  await writeFile(path.join(dir, `${base}.html`), message.html, "utf8");
  await writeFile(path.join(dir, `${base}.txt`), message.text, "utf8");
}

export async function deliverBrief(messages: Outgoing[]): Promise<"email" | "preview"> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const smtpHost = process.env.SMTP_HOST;

  if (apiKey && from) {
    const resend = new Resend(apiKey);
    for (const message of messages) {
      const result = await resend.emails.send({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
    }
    return "email";
  }

  if (smtpHost && process.env.SMTP_USER && process.env.SMTP_PASS && from) {
    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    for (const message of messages) {
      await transport.sendMail({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
      });
    }
    return "email";
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Email is not configured. Add RESEND_API_KEY or SMTP settings.");
  }

  for (const message of messages) {
    await savePreview(message);
  }
  return "preview";
}

export function inboxAddress() {
  return process.env.INBOX_EMAIL || site.email;
}
