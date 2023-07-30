const nodemailer = require('nodemailer');
const VerifyEmailTemplate = require("./templates/VerifyEmail");
const ForgotPasswordTemplate = require("./templates/ForgotPassword");
require('dotenv').config();


const SendEmail = async (email,code, url)=>{
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
        html: url ? ForgotPasswordTemplate(code, url) : VerifyEmailTemplate(code)
    };
    
    await mailTransporter.sendMail(mailDetails)
    .catch(err=>{
        console.log(err);
        throw Error("Email send error")
    })

}

module.exports = SendEmail;