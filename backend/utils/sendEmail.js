import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const sendEmail = async(options)=>{
    const transport = nodemailer.createTransport({
        host:process.env.MAILER_HOST,
        port:process.env.MAILER_PORT,
        service:process.env.MAILER_SERVICE,
        auth:{
            user:process.env.MAILER_USER,
            pass:process.env.MAILER_PASS
        }
    })

    const mailOptions = {
        from:process.env.MAILER_USER,
        to:options.recipient,
        subject:options.subject,
        text:options.text
    }

    await transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    })
}

export default sendEmail