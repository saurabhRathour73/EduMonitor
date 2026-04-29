const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the button below to verify your account:</p>
        <a href="${link}" style="padding:10px 20px;background:blue;color:white;text-decoration:none;">
          Verify Email
        </a>
      `
    });

    console.log("Email sent successfully ✅");

  } catch (error) {
    console.log("Email error ❌", error);
  }
};

module.exports = sendEmail;