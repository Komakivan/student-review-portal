const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'komabusiness8@gmail.com',
        pass: 'xumr ihyw gdjk uzvv'
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