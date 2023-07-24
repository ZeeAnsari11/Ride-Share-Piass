const nodemailer = require('nodemailer');
const VerifyEmailTemplate = require("./templates/VerifyEmail");
require('dotenv').config();


const SendEmail = async (email,code)=>{
    mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        }
    });

    mailDetails = {
        from: 'mailsender193@gmail.com',
        to: email,
        subject: 'Verifying Your Email For Start Up',
        html: VerifyEmailTemplate(code)
    };
    
    await mailTransporter.sendMail(mailDetails)
    .catch(err=>{
        console.log(err);
    })

}

module.exports = SendEmail;