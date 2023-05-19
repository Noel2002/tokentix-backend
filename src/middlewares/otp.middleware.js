import OTP from "../models/otp.model.js"
import { sendGmail } from "../utlils/email.util.js";
import { generateOTP } from "../utlils/encryption.util.js";

export const sendOTP = async (req, res, next) =>{
    try{
        const {email} = req.body;
        const code = generateOTP();

        const entry = OTP.create({email, code});
        await sendGmail(email,"Tokenix email verification", `Your verification One-Time-Password is ${code}`);
    }
    catch(error){
        next(error);
    }
}
