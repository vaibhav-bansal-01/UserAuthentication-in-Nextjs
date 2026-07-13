import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY_EMAIL") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
      });
    } else if (emailType === "FORGOT_PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: `${process.env.MAILTRAP_USER}`,
        pass: `${process.env.MAILTRAP_PASS}`,
      },
    });
    const mailOptions = {
      from: "noreply@example.com",
      to: email,
      subject:
        emailType === "VERIFY_EMAIL"
          ? "Verify your email"
          : "Reset your password",
      html: `
  <p>Hello ${email},</p>
  <a href="${process.env.DOMAIN}/${emailType === "VERIFY_EMAIL" ? "verifyemail" : "resetpassword"}?token=${encodeURIComponent(hashedToken)}">
    Click here to reset your password
  </a>
`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendMail;
