import mongoose from "mongoose";


const PriceSchema = mongoose.Schema(
    {
        price:{
            type:Number,required:true
        },
        description:{
            type:String,required:true
        },
        benifit:{
            type:String,required:true
        }
    }
)

const PriceModel = mongoose.model("price_menu",PriceSchema);
export default PriceModel