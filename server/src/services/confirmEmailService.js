
import nodemailer from 'nodemailer'

export async function sendConfirmationEmail({ to, subject ,message , attachments=[]}={}) {

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASS,
    },
})


const mailInfo = await transport.sendMail({
    from: `"E-mart" <${process.env.GMAIL_EMAIL}>`,
    to: to?to : "",
    subject: subject?subject : "",
    html: message?message :"",
    attachments,
})

}