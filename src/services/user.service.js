import User from "../models/users.model.js"
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

export const findUserByEmailWithPassword = async (email) =>{
    const user = await User.findOne({email}).select("+password");
    return user;
}

export const findAllUsers = async()=>{
    const users = await User.find();
    return users;
}