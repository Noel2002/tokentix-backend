import OTP from "../models/otp.model.js"

export const createOTPEntry = async (email, otp)=>{
    const entry = await OTP.create({email, code: otp});
}

export const updateOTPEntry = async (email, newOTP)=>{
    const entry = await OTP.updateOne({email}, {code: newOTP});
}

export const OTPEntryExists = async(email)=>{
    const entry = await OTP.findOne({email});
    return entry !== {} ? true : false;
}