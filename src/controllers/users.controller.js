import { OTPEntryExists, updateOTPEntry } from "../services/otp.service.js";
import { activateUser, createUser, findAllUsers, findUserByEmail, findUserByEmailWithPassword, findUserById } from "../services/user.service.js";
import ApplicationError from "../utlils/Errors/ApplicationError.js";
import BadRequestError from "../utlils/Errors/BadRequestError.js";
import {sendGmail} from "../utlils/email.util.js";
import { comparePassword, generateOTP, generateToken } from "../utlils/encryption.util.js";

export const signupController = async (req, res, next) =>{
    try{
        const user = await createUser(req.body);
        res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });
        next(); //send OTP
    }
    catch( error ){
        next(error);
    }
    
}

export const loginController = async(req, res, next) =>{
    try {
        // Find user
        const user = await findUserByEmailWithPassword(req.body.email);
        if(!user){
            throw new ApplicationError(401, "User does not exist");
        }

        if( !user.activated ){
            throw new ApplicationError(401, "Account not activated. Please activate your account");
        }

        // Verify if the password is correct
        const match = await comparePassword(req.body.password, user.password);
        if( !match ) {
            throw new ApplicationError(401, "Incorrect password")
        }

        // Generation of user token
        const token = generateToken({id: user._id, email: user.email}, '24h');
        return res.status(200).json({
            status: 200,
            message: "Login successful",
            token,
            data: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getAllUsersController = async(req, res, next) =>{
    try {
        const users = await findAllUsers();
        res.status(200).json({
            status: 200,
            data: users
        })
    } catch (error) {
        next(error);
    }
}

export const sendOTPController = async(req, res, next) =>{
    try {
        const {email} = req.body;

        if( ! OTPEntryExists(email) ) throw new BadRequestError("No Entry is related to this email");
        
        const code = generateOTP();
        await updateOTPEntry(email, code);

        const subject = "Tokenix email verification";
        const message = `Your verication One-Time-Password is ${code}.`
        await sendGmail(email, subject,message);
        return res.status(200).json({
            status: 200,
            message: "OTP sent sucessfully",
        });
    } catch (error) {
        next(error);
    }
}

export const activateUserController = async(req, res, next)=>{
    try {
        const {email, code} = req.body;
        const user = await activateUser(email, code);
        if( !user ) throw new ApplicationError(404, "Account does not exist");

        return res.status(200).json({
            status: 200,
            message: "Account activated successfully"
        });
    } catch (error) {
        next(error);
    }

}

export const getUserController = async (req, res, next)=>{
    try {
       const {id} = req.params;
       const user = await findUserById(id); 
       if( !user ) throw new ApplicationError(404, "Account does not exist")
       res.status(200).json({
        status: 200,
        data: user
       });

    } catch (error) {
        next(error)
    }
    

}