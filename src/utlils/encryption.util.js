import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApplicationError from './Errors/ApplicationError.js';
import otpGenerator from 'otp-generator';

export const generateToken = (payload, expiresIn) =>{
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
        return token;
    } catch (error) {
        throw new ApplicationError(500, error.message);
    }
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) =>{
    const match = bcrypt.compare(password, hashedPassword);
    return match;
}

export const generateOTP = ()=>{
    return otpGenerator.generate(6, { lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars: false });

}