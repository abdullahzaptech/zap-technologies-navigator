import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, inquiryType, budget, timeline, message } =
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

    const details = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      inquiryType ? `Inquiry Type: ${inquiryType}` : "",
      budget ? `Budget: ${budget}` : "",
      timeline ? `Timeline: ${timeline}` : "",
      `\nMessage:\n${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    await client.send({
      from: senderEmail,
      to: senderEmail,
      subject: `New Contact Form: ${inquiryType || "General"} from ${name}`,
      content: `New form submission from Zap Technologies website:\n\n${details}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#2563eb;border-bottom:2px solid #2563eb;padding-bottom:10px;">
            ⚡ New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:8px;font-weight:bold;color:#374151;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;color:#374151;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Phone</td><td style="padding:8px;">${phone}</td></tr>` : ""}
            ${inquiryType ? `<tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;color:#374151;">Inquiry Type</td><td style="padding:8px;">${inquiryType}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Budget</td><td style="padding:8px;">${budget}</td></tr>` : ""}
            ${timeline ? `<tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;color:#374151;">Timeline</td><td style="padding:8px;">${timeline}</td></tr>` : ""}
          </table>
          <div style="background:#f3f4f6;padding:16px;border-radius:8px;margin-top:16px;">
            <h3 style="margin:0 0 8px;color:#374151;">Message</h3>
            <p style="margin:0;color:#4b5563;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#9ca3af;font-size:12px;margin-top:24px;">Sent from Zap Technologies contact form</p>
        </div>
      `,
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
