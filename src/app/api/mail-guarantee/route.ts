import supabaseClient from "@/supabase/client";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message, captchaToken } = await request.json();

  if (!captchaToken) {
    return Response.json(
      { message: "reCAPTCHA token is missing" },
      { status: 400 },
    );
  }

  const verifyResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY_V2!,
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
          <p><strong>Email:</strong> ${email}</p>
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

  return Response.json({ error: "" }, { status: 500 });
}
