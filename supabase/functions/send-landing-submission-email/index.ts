import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { pageTitle, pageType, formData, attachmentUrls } = await req.json();
    console.log("Received submission for:", pageTitle, "type:", pageType);

    const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");
    if (!GMAIL_APP_PASSWORD) {
      console.error("GMAIL_APP_PASSWORD is not configured");
      throw new Error("GMAIL_APP_PASSWORD is not configured");
    }

    const senderEmail = "abdullahdesigner51@gmail.com";

    const tableRows = Object.entries(formData || {})
      .map(([key, val], i) => {
        const bgColor = i % 2 === 0 ? "#f8fafc" : "#ffffff";
        const cellVal = String(val).startsWith("http")
          ? '<a href="' + escapeHtml(String(val)) + '" style="color:#2563eb;text-decoration:underline;">View File</a>'
          : escapeHtml(String(val));
        return '<tr><td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;white-space:nowrap;border-bottom:1px solid #e2e8f0;background:' + bgColor + ';">' + escapeHtml(key) + '</td><td style="padding:14px 20px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0;background:' + bgColor + ';">' + cellVal + '</td></tr>';
      }).join("");

    const attachmentLinks = (attachmentUrls || []).length > 0
      ? '<tr><td colspan="2" style="padding:16px 20px;border-top:2px solid #e2e8f0;"><p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;">ATTACHMENTS</p>' +
        (attachmentUrls as string[]).map((url: string) =>
          '<a href="' + escapeHtml(url) + '" style="color:#2563eb;text-decoration:underline;font-size:14px;display:block;margin-bottom:6px;">' + (url.split("/").pop() || "File") + '</a>'
        ).join("") +
        '</td></tr>'
      : "";

    const typeLabel = (pageType || "").replace("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">' +
      '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;"><tr><td align="center" style="padding:40px 16px;">' +
      '<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-collapse:collapse;">' +
      '<tr><td align="center" style="background-color:#1e3a8a;padding:36px 32px;border-radius:16px 16px 0 0;">' +
      '<table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td style="background-color:#ffffff;border-radius:10px;padding:8px 18px;">' +
      '<span style="font-size:22px;font-weight:800;color:#1e3a8a;">ZAP</span>' +
      '</td></tr></table>' +
      '<h1 style="margin:20px 0 0;font-size:20px;font-weight:700;color:#ffffff;line-height:1.4;">New Landing Page Submission</h1>' +
      '<p style="margin:8px 0 0;font-size:14px;color:#bfdbfe;line-height:1.4;">' + escapeHtml(pageTitle || "Landing Page") + '</p>' +
      '</td></tr>' +
      '<tr><td align="center" style="background-color:#ffffff;padding:24px 32px 8px;">' +
      '<table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td style="background-color:#dbeafe;padding:6px 20px;border-radius:20px;font-size:11px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:1px;">' + escapeHtml(typeLabel || "Submission") + '</td></tr></table>' +
      '</td></tr>' +
      '<tr><td style="background-color:#ffffff;padding:16px 32px 32px;">' +
      '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:8px;border-collapse:collapse;">' +
      tableRows + attachmentLinks +
      '</table></td></tr>' +
      '<tr><td align="center" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:24px 32px;">' +
      '<p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">This email was sent from <strong style="color:#475569;">Zap Technologies</strong></p>' +
      '<p style="margin:6px 0 0;font-size:11px;color:#cbd5e1;">' + dateStr + '</p>' +
      '</td></tr>' +
      '</table></td></tr></table></body></html>';

    console.log("Connecting to SMTP...");
    const client = new SMTPClient({
      connection: { hostname: "smtp.gmail.com", port: 465, tls: true, auth: { username: senderEmail, password: GMAIL_APP_PASSWORD } },
    });

    const name = (formData as Record<string, string>)?.Name || (formData as Record<string, string>)?.name || "Someone";
    console.log("Sending email for:", name);
    
    await client.send({
      from: senderEmail,
      to: senderEmail,
      subject: "New " + typeLabel + " Submission: " + name + " - " + pageTitle,
      content: "New submission on " + pageTitle + " from " + name,
      html: htmlContent,
    });
    
    console.log("Email sent successfully!");
    await client.close();

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
