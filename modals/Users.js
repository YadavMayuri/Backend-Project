import mongoose from "mongoose";
import { Schema } from "mongoose";
import { object } from "webidl-conversions";

const User = new Schema({
    // name : String,
    email : String,
    password: String,
    number : Number ,
    otpForNumber: String,
    otpForEmail: String,
    isNumberVerified :{type: Boolean,default: false},
    isEmailVerified :{type: Boolean,default: false},
    loginOtp: String,
    // 2 new shcema of number and emial with otp

    loginOTPforNumber:String,
    loginOTPforEmail:String,
    isLoginNumberVerified :{type: Boolean,default: false},
    isLoginEmailVerified :{type: Boolean,default: false},
    products:[]

    
})


export default mongoose.model("Users", User)