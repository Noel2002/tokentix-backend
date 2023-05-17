import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    dob: {
        required: true,
        type: Date
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    photo:{
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

export default User;