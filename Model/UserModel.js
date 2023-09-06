import mongoose from "mongoose";

const UserShema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },

        password :{
            type : String,
            required : true,
        } ,

        email :{
            type : String,
            required : true,
        },
        otp :{
            type : Number,
            expires: 600,
        },
        otpVerify :{
            type : Boolean,
            default : false,
        },
        isAdmin :{
            type : Boolean,
            default : false,
        },
        active :{
            type : Boolean,
            default : false,
        },
        wallet :{
            type : Number,
            default : 0,
        },



    },

    {timestamps : true}
)

const UserModel = mongoose.model("Users",UserShema);
export default UserModel