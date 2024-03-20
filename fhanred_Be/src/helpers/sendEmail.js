const nodemailer = require('nodemailer');

const sendMail = async (option) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host:"smtp.gmail.com",   
        port:465,
        secure: true,
        auth: {     
            
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            
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