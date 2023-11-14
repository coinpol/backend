import express from 'express'
import mongoose from 'mongoose'
import SampleRouter from './Router/SampleRouter.js'
import dotenv from 'dotenv'
import AuthRouter from './Router/AuthRouter.js'
import CoinRouter from './Router/CoinRouter.js'



const app = express()
dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO).then(()=>{
    app.listen(5001,()=>{
        console.log("server connected 5001")
    })
}).catch((err)=>{
    console.log("server not connected")
    console.log(err)
})


app.use('/api',SampleRouter)
app.use('/api',AuthRouter)
app.use('/api',CoinRouter)