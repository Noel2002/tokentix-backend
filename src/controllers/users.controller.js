import { createUser, findAllUsers, findUserByEmailWithPassword } from "../services/user.service.js";
import ApplicationError from "../utlils/Errors/ApplicationError.js";
import { comparePassword, generateToken } from "../utlils/encryption.util.js";

export const signupController = async (req, res, next) =>{
    try{
        const user = await createUser(req.body);
        const token = generateToken({id: user._id, email: user.email}, '24h');
        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            token,
            data: user
        });
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