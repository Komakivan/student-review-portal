const nodemailer = require('nodemailer');
require('dotenv').config()

const transport = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

const sendMail = async (mailDetails, callback) => {
    try {
        const mail = await transport.sendMail(mailDetails)
        callback(mail)
    } catch (error) {
        console.log(error)
    }
}



module.exports = sendMail