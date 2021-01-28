"use strict";
import nodemailer from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(to: string, text: string, token: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "cbjoejuxjw7itcjv@ethereal.email", // generated ethereal user
      pass: "cjt5ymwDCggR65Wf66", // generated ethereal password
    },
  });

  //   console.log(transporter);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "password reset", // Subject line
    text, // plain text body
    html: `<p>to reset the password click this <a href='http://localhost:3000/reset-password/${token}'>link</a></p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
