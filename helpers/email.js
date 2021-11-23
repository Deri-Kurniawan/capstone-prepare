const fs = require('fs');
const nodemailer = require('nodemailer');

class Email {
    constructor(host = 'smtp.gmail.com', port = 587, secure = false, user = 'cadlabahlimited@gmail.com', pass = 'cadlabah123') {
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
            priority: 'high',
        });
    }

    send({from = 'cadlabahlimited@gmail.com', to = 'deri.netuchi@gmail.com', subject = "Email From Node JS", text = "Body Email From Node Js", html = null}) {
        this.transporter.send({ from, to, subject, text, html }, (error, info) => {
            if (error) {
                return `Error : ${error}`;
            } else {
                return `Email sent : ${info()}`;
            }
        });
    }
}

module.exports = Email;