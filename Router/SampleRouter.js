import express from 'express'
import { sampleApi } from '../Controller/SampleController.js'


const router = express.Router()

router.post("/test",sampleApi)




export default router