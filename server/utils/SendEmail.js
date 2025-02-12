import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text: message,
    });

    console.log("Email inviata con successo!");
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    throw new Error("Errore nell'invio dell'email");
  }
};
