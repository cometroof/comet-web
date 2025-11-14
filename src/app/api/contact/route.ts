import supabaseClient from "@/supabase/client";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { captchaToken, ...formData } = body;
  const { name, email, phone, inquiry, message, currentPath } = formData;

  // Verify recaptcha token
  const verifyResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.CAPTCHA_SECRET_KEY!, // v3 secret key
        response: captchaToken,
      }),
    },
  );

  const verifyData = await verifyResponse.json();

  if (!verifyData.success) {
    return Response.json(
      {
        message: "reCAPTCHA verification failed",
        errors: verifyData["error-codes"],
      },
      { status: 400 },
    );
  }

  // v3 memberikan score 0.0 - 1.0
  // 1.0 = sangat yakin human, 0.0 = sangat yakin bot
  // Threshold umum: 0.5 (bisa disesuaikan)
  const score = verifyData.score || 0;
  if (score < 0.5) {
    return Response.json(
      {
        message: "Suspicious activity detected. Please try again.",
      },
      { status: 400 },
    );
  }

  if (!name || !email || !phone || !inquiry || !message) {
    return Response.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  // Ambil email tujuan dari database
  const { data: target, error: dbError } = await supabaseClient
    .from("contacts-location")
    .select("value,type")
    .in("type", ["email", "email_form"]);

  if (dbError || !target) {
    console.error("Database error:", dbError);
    return Response.json(
      { message: "Failed to fetch email configuration" },
      { status: 500 },
    );
  }

  const emailTarget =
    target.find((d) => d.type === "email_form")?.value ||
    target.find((d) => d.type === "email")?.value;

  if (!emailTarget) {
    return Response.json(
      { message: "Email target not configured" },
      { status: 500 },
    );
  }

  // Setup transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailTarget,
      subject: `Permintaan Kontak dari ${name}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: #ed1c24; padding: 20px; text-align: center; border: 2px solid #000; border-bottom: none; }
          .content { padding: 20px; background-color: #f9f9f9; border: 2px solid #000; border-top: none; }
          .field { margin-bottom: 15px; }
          .field strong { display: inline-block; width: 120px; color: #111; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #888; }
          .claimArea {
              margin-top: 10px; padding: 10px; background-color: white; border-left: 4px solid #000;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>FORM CONTACT</h1>
          </div>
          <div class="content">
            <div class="field"><strong>Nama:</strong> ${name}</div>
            <div class="field"><strong>Email:</strong> ${email}</div>
            <div class="field"><strong>No. Telepon:</strong> ${phone}</div>
            <div class="field"><strong>Inquiry:</strong> ${inquiry}</div>
            <div class="field">
              <strong>Message:</strong><br>
              <div class="claimArea">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Email ini dikirim otomatis dari <a href="${currentPath}">Form Contact</a> website</a>.</p>
            <p>reCAPTCHA Score: ${score.toFixed(2)}</p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    return Response.json({
      success: true,
      message: "Your message has been sent",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      {
        message: "Failed to send message",
        error: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}
