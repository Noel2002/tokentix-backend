import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email:{
        unique: true,
        type: String,
        required: [true, "Email is required"]
    },
    code: {
        type: Number,
        required: [true, "OTP is required"]
    }
});

const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;