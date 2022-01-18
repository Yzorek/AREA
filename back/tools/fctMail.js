const nodemailer = require('nodemailer');
const settings = require('../config/mail.json').settings

const transporter = nodemailer.createTransport({
    service: settings.service,
    auth: {
        user: settings.auth.user,
        pass: settings.auth.pass
    }
});

function createMail(recipient, subject, text, html) {
    const mailOptions = {
        from: settings.auth.user,
        to: recipient,
        subject: subject,
        text: text,
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent to ' + recipient + ': ' + info.response);
        }
    });
}

module.exports = {
    createMail
}

