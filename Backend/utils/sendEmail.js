import nodemailer from "nodemailer"

export const sendEmail = async (to , subject , text) => {
    try {
        const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
      },
    });

    await transporter.sendMail({
      from: `"Qarz-e-Hasana" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("📧 Email sent successfully to:", to);

    }
    catch (err) {
        console.log("Error sending the mail is : " , err.message)
    }
}