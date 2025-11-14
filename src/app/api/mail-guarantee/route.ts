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
      currentPath,
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
          secret: process.env.CAPTCHA_SECRET_KEY!, // v3 secret key
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
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailTarget,
      cc: "azizditya@gmail.com",
      subject: `Claim Garansi dari ${name}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ed1c24; color: #fff; padding: 20px; text-align: center; border: 2px solid #ed1c24; border-bottom: none; }
          .content { padding: 20px; background-color: #f9f9f9; border: 2px solid #ed1c24; border-top: none; }
          .field { margin-bottom: 15px; }
          .field strong { display: inline-block; width: 120px; color: #111; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #888; }
          .claimArea {margin-top: 10px; padding: 10px; background-color: white; border-left: 4px solid #ed1c24;}
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
              <div class="claimArea">
                ${issues.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Email ini dikirim otomatis dari <a href="${currentPath}">Form Claim Garansi</a> website.</p>
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
