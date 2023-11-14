import mongoose from "mongoose";

const CoinSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },

        time :{
            type : String,
            required : true,
        } ,

        red: [String],
        black: [String],
        green: [String],
        active :{
            type : Boolean,
            default : false,
        },
        wallet :{
            type : Number,
            default : 0,
        },
        result :{
            type : String,
            default : "Not Published",
        },

    },

    {timestamps : true}
)

const CoinModel = mongoose.model("coin",CoinSchema);
export default CoinModel