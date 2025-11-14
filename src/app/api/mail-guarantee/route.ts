import supabaseClient from "@/supabase/client";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      postal_code,
      issues,
      captchaToken,
    } = await request.json();

    // Validasi captcha token
    if (!captchaToken) {
      return Response.json(
        { message: "reCAPTCHA token is missing" },
        { status: 400 },
      );
    }

    // Verifikasi token ke Google
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.CAPTCHA_SITE_KEY!, // v3 secret key
          response: captchaToken,
        }),
      },
    );

    const verifyData = await verifyResponse.json();

    // Untuk v3: cek success dan score
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
      console.log(`Low reCAPTCHA score: ${score}`);
      return Response.json(
        {
          message: "Suspicious activity detected. Please try again.",
        },
        { status: 400 },
      );
    }

    // Validasi input
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postal_code ||
      !issues
    ) {
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
      host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
      port: parseInt(process.env.SMTP_PORT || "587"), // 587 untuk TLS, 465 untuk SSL
      secure: process.env.SMTP_SECURE === "true", // true untuk port 465, false untuk port lainnya
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Opsional: untuk debugging
      // logger: true,
      // debug: true,
    });

    // Kirim email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "azizditya@gmail.com",
      subject: `Claim Garansi dari ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .field strong { display: inline-block; width: 120px; color: #555; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>FORM CLAIM GARANSI</h1>
            </div>
            <div class="content">
              <div class="field"><strong>Nama:</strong> ${name}</div>
              <div class="field"><strong>Email:</strong> ${email}</div>
              <div class="field"><strong>No. Telepon:</strong> ${phone}</div>
              <div class="field"><strong>Alamat:</strong> ${address}</div>
              <div class="field"><strong>Kota:</strong> ${city}</div>
              <div class="field"><strong>Kode Pos:</strong> ${postal_code}</div>
              <div class="field">
                <strong>Keluhan:</strong><br>
                <div style="margin-top: 10px; padding: 10px; background-color: white; border-left: 4px solid #4CAF50;">
                  ${issues.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
            <div class="footer">
              <p>Email ini dikirim otomatis dari form claim garansi website.</p>
              <p>reCAPTCHA Score: ${score.toFixed(2)}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return Response.json(
      {
        success: true,
        message: "Claim submitted successfully",
      },
      { status: 200 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("Error processing claim:", error);
    return Response.json(
      {
        message: "Failed to process claim",
        error: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
