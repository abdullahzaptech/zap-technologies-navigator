import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml({
  name, email, phone, inquiryType, budget, timeline, message, projectLink, attachmentUrl,
}: Record<string, string | null | undefined>) {
  const rows: { label: string; value: string; icon: string }[] = [];
  rows.push({ label: "Name", value: name || "—", icon: "👤" });
  rows.push({ label: "Email", value: `<a href="mailto:${escapeHtml(email || "")}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email || "—")}</a>`, icon: "📧" });
  if (phone) rows.push({ label: "Phone", value: escapeHtml(phone), icon: "📱" });
  if (inquiryType) rows.push({ label: "Inquiry Type", value: escapeHtml(inquiryType), icon: "📋" });
  if (budget) rows.push({ label: "Budget", value: escapeHtml(budget), icon: "💰" });
  if (timeline) rows.push({ label: "Timeline", value: escapeHtml(timeline), icon: "⏱️" });

  const tableRows = rows
    .map(
      (r, i) =>
        `<tr style="background:${i % 2 === 0 ? "#f8fafc" : "#ffffff"};">
          <td style="padding:14px 16px;font-size:13px;color:#64748b;font-weight:600;white-space:nowrap;border-bottom:1px solid #f1f5f9;">
            ${r.icon} ${r.label}
          </td>
          <td style="padding:14px 16px;font-size:14px;color:#1e293b;border-bottom:1px solid #f1f5f9;">
            ${r.value}
          </td>
        </tr>`
    )
    .join("");

  const attachmentSection = attachmentUrl
    ? `<div style="margin-top:20px;padding:16px;background:linear-gradient(135deg,#eff6ff,#f0f9ff);border-radius:12px;border:1px solid #bfdbfe;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding-right:12px;">📎</td>
          <td>
            <span style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Attached File</span><br/>
            <a href="${escapeHtml(attachmentUrl)}" style="color:#2563eb;text-decoration:none;font-size:14px;font-weight:500;">View / Download Attachment →</a>
          </td>
        </tr></table>
      </div>`
    : "";

  const linkSection = projectLink
    ? `<div style="margin-top:12px;padding:16px;background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border-radius:12px;border:1px solid #bbf7d0;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding-right:12px;">🔗</td>
          <td>
            <span style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Project Link</span><br/>
            <a href="${escapeHtml(projectLink)}" style="color:#16a34a;text-decoration:none;font-size:14px;font-weight:500;">${escapeHtml(projectLink.length > 60 ? projectLink.substring(0, 60) + "..." : projectLink)} →</a>
          </td>
        </tr></table>
      </div>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#3b82f6 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:12px 16px;margin-bottom:16px;">
        <span style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">⚡ ZAP</span>
      </div>
      <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
        New Contact Submission
      </h1>
      <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.75);">
        Someone reached out via your website
      </p>
    </div>

    <!-- Inquiry Badge -->
    <div style="background:#ffffff;padding:20px 32px 0;text-align:center;">
      <div style="display:inline-block;background:linear-gradient(135deg,#dbeafe,#ede9fe);padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;color:#4338ca;text-transform:uppercase;letter-spacing:0.8px;">
        ${escapeHtml(inquiryType || "General Inquiry")}
      </div>
    </div>

    <!-- Details Table -->
    <div style="background:#ffffff;padding:24px 32px;">
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        ${tableRows}
      </table>
    </div>

    <!-- Message -->
    <div style="background:#ffffff;padding:0 32px 24px;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;">
        <div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px;">
          💬 Message
        </div>
        <div style="font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message || "")}</div>
      </div>
      ${attachmentSection}
      ${linkSection}
    </div>

    <!-- Action Button -->
    <div style="background:#ffffff;padding:0 32px 32px;text-align:center;">
      <a href="mailto:${escapeHtml(email || "")}" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#ffffff;padding:14px 40px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">
        Reply to ${escapeHtml((name || "").split(" ")[0])} →
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;border-radius:0 0 16px 16px;border-top:1px solid #e2e8f0;padding:24px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">
        This email was automatically sent from the<br/>
        <strong style="color:#475569;">Zap Technologies</strong> contact form
      </p>
      <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;">
        ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </p>
    </div>

  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, inquiryType, budget, timeline, message, projectLink, attachmentUrl } =
      await req.json();

    const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");
    if (!GMAIL_APP_PASSWORD) {
      throw new Error("GMAIL_APP_PASSWORD is not configured");
    }

    const senderEmail = "abdullahdesigner51@gmail.com";

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: senderEmail,
          password: GMAIL_APP_PASSWORD,
        },
      },
    });

    const htmlContent = buildEmailHtml({
      name, email, phone, inquiryType, budget, timeline, message, projectLink, attachmentUrl,
    });

    await client.send({
      from: senderEmail,
      to: senderEmail,
      subject: `⚡ New ${inquiryType || "Contact"}: ${name} — Zap Technologies`,
      content: `New form submission from ${name} (${email}):\n\n${message}${projectLink ? `\n\nProject Link: ${projectLink}` : ""}${attachmentUrl ? `\n\nAttachment: ${attachmentUrl}` : ""}`,
      html: htmlContent,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
