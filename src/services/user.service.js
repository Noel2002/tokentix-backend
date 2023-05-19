import OTP from "../models/otp.model.js";
import User from "../models/users.model.js"
import ApplicationError from "../utlils/Errors/ApplicationError.js";
import BadRequestError from "../utlils/Errors/BadRequestError.js";

export const createUser = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        throw new BadRequestError(error.message);
    }
    
}

export const findUserByEmail = async (email) =>{
    const user = await User.findOne({email});
    return user;
}

export const findUserById = async(id)=>{
    const user = await User.findOne({_id: id});
    return user;
}
export const findUserByEmailWithPassword = async (email) =>{
    const user = await User.findOne({email}).select("+password");
    return user;
}

export const findAllUsers = async()=>{
    const users = await User.find();
    return users;
}
export const activateUser = async (email, code)=>{
    const OTPEntry = await OTP.findOne({email});
    if( !OTPEntry ) throw new ApplicationError(404, "No OTP entry found for the user! Try to resend")
    if(OTPEntry.code !== code) throw new ApplicationError(403, "Invalid OTP");
    const user = await User.updateOne({email}, {activated: true});
    return user;
}
