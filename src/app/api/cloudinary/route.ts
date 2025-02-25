import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { from, to, subject, content } = body;

    if (!to || !subject || !content) {
      return new Response("Missing required email parameters", { status: 400 });
    }

    await resend.emails.send({
      from: from ?? "onboarding@resend.dev",
      to: to ?? "booksforkindle@gmail.com",
      subject: subject ?? "example subject",
      html:
        content ??
        `<p>Congrats on sending your <strong>email</strong> at ${new Date()}!</p>`,
    });
    return new Response("Email sent successfully!", { status: 200 });
  } catch (error) {
    console.log("🚀 ~ Sending Email Error:", error);
    return new Response("Error sending email", { status: 500 });
  }
}
