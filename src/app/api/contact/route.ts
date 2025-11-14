import supabaseClient from "@/supabase/client";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { recaptchaToken, ...formData } = body;
  const { name, email, phone, inquiry, message } = formData;

  // Verify recaptcha token
  const verifyResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    },
  );

  const verifyData = await verifyResponse.json();

  if (!verifyData.success || verifyData.score < 0.5) {
    return Response.json(
      { error: "ReCaptcha verification failed" },
      { status: 400 },
    );
  }

  // Process form data
  // ... your logic here

  const target = (
    await supabaseClient
      .from("contacts-location")
      .select("value,type")
      .in("type", ["email"])
  ).data;

  if (target) {
    const emailTarget =
      target.find((d) => d.type === "email_form")?.value ||
      target.find((d) => d.type === "email")?.value;
    const transporter = nodemailer.createTransport({
      service: "gmail", // atau SMTP lain
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailTarget,
        subject: `Claim Garansi dari ${name}`,
        html: `
          <h1 style='text-align: center;'>FORM CLAIM GARANSI</h1>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry:</strong> ${inquiry}</p>
          <p><strong>Pesan:</strong> ${message}</p>
        `,
      });

      return Response.json({ success: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return Response.json(
        { error: "Failed to send email: " + error?.message || "" },
        { status: 500 },
      );
    }
  }

  return Response.json({ success: true });
}
