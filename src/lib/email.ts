import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface LeadEmailData {
  name: string;
  phone: string;
  email?: string;
  loanType?: string;
  message?: string;
}

export async function sendLeadEmail(data: LeadEmailData) {
  const { name, phone, email, loanType, message } = data;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9fafb; border-radius: 8px;">
      <div style="background-color: #1e293b; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Lead from Portfolio Website</h1>
      </div>
      <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #111827;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
            <td style="padding: 8px 0; color: #111827;"><a href="tel:${escapeHtml(phone)}" style="color: #2563eb;">${escapeHtml(phone)}</a></td>
          </tr>
          ${email ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></td></tr>` : ""}
          ${loanType ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Loan Type:</td><td style="padding: 8px 0; color: #111827;">${escapeHtml(loanType)}</td></tr>` : ""}
          ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Message:</td><td style="padding: 8px 0; color: #111827;">${escapeHtml(message)}</td></tr>` : ""}
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 12px; color: #9ca3af; text-align: center;">
        Prashanna Sangroula &mdash; NMLS #2528620
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "prashanna@loanfactory.com",
    subject: `New Lead from Portfolio: ${name} - ${loanType || "General Inquiry"}`,
    html: htmlBody,
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
