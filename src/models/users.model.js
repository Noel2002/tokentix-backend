import mongoose from "mongoose";
import { hashPassword } from "../utlils/encryption.util.js";

const UserSchema = new mongoose.Schema({
    first_name: {
        required: [true, 'First name is required'],
        type: String
    },
    last_name: {
        required: [true, 'Last name is required'],
        type: String
    },
    dob: {
        required: [true, 'Date of birth is required'],
        type: Date
    },
    email: {
        required: [true, "Email is required"],
        unique: {message:'There is an account already registered on this email'},
        type: String
    },
    phone: {
        required: [true, 'Phone is required'],
        type: String
    },
    password: {
        required: [true, 'Password is required'],
        type: String,
        select: false
    },
    photo:{
        type: String
    },
    activated:{
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', async function (next){
    this.password = await hashPassword(this.password);
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;