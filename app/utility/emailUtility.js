// === External Imports ===
import nodemailer from "nodemailer";

export const sendMail = async (emailTo, emailSub, emailBody) => {
  const transporter = nodemailer.createTransport({
    host: "mail.themesoft69.com",
    port: 465,
    secure: true, // user true for port 465 and false for all others ports
    auth: {
      user: "mern_ostad@themesoft69.com",
      pass: "h4e24DFTj6v)",
    },
  });

  const info = {
    from: `"Ostad Mern 6 🎁" <mern_ostad@themesoft69.com>`, // sender address
    to: emailTo, // receiver address
    subject: emailSub, // Subject line
    text: "This is Sample Email", // plain text body
  };

  return await transporter.sendMail(info);
};
