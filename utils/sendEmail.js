const nodemailer = require("nodemailer")
const capitalize = require('./capitalize')

const sendEmail = async (formData) => {
  const {name, phone, msg} = formData
  const capitalizedName = capitalize(name)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    }
  })
  const mailOptions = {
    from: `Site <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "Mensagem do Site",
    html: `
      <strong>Nome:</strong> ${capitalizedName}<br>
      <strong>Telefone:</strong> ${phone}<br>
      <strong>Mensagem:</strong> ${msg}
    `,
  }
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
