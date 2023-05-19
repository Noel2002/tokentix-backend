import nodemailer from "nodemailer";

export const sendGmail = async (receiver, subject, content)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
        });
        
        const mailConfigurations = {
            from: process.env.GMAIL_EMAIL,
            to: receiver,
            subject: subject,
            html: `
                <p>${content}</p>
            `,
        };
            
        try{
            await transporter.sendMail(mailConfigurations);
        }
        catch(error){
            throw new Error(error);
        }
      
}

