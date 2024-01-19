const nodemailer = require('nodemailer');

const sendMail = async (option) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            clientId: process.env.ID_CLIENT,
            clientSecret: process.env.SECRET_CLIENT,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    let mailOptions = {
        from: process.env.SMTP_USER,
        to: option.email,
        subject: option.subject,
        html: option.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (err) {
        console.error("Error sending email");
    }
};

module.exports = sendMail;