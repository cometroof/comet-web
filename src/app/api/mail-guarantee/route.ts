import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

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
      to: "tujuan@email.com",
      subject: `Pesan dari ${name}`,
      html: `
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
