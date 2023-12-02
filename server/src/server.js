const http = require('http');
const mongoose = require('mongoose');
const app = require('./app')
const sendMail = require('../mail/mail')

require('dotenv').config()


const server = http.createServer(app);

const PORT = process.env.PORT || 6001;

// Nodemailer testing
const message = 'This is a test message'

const options = {
    from: 'komabusiness8@gmail.com',
    to: 'komakechivan555@gmail.com',
    subject:'Nodemailer test email from komak😁',
    text: message
}

// TODO: remove this when tests are over

async function startServer () {
    // await sendMail(options, (mail) => {
    //     console.log('mail sent')
    //     console.log('mailID', mail.messsageId)
    // })
    await mongoose.connect(process.env.MONGO_URL)
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}...`);
    });
}


startServer();