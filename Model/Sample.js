import mongoose from "mongoose";


const SampleSchema = mongoose.Schema(
    {
        name:{
            type:String,required:true
        },
        email:{
            type:String,required:true
        },
        password:{
            type:String,required:true
        }
    }
)

const SampleModel = mongoose.model("sample",SampleSchema);
export default SampleModel