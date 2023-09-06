import express from 'express'
import {getAllUser, loginUser, reVerify, registerUser, updateUser, verifyOtp} from '../Controller/AuthController.js'

const router = express.Router()

router.post('/register',registerUser)  
router.post('/verify',verifyOtp)  
router.post('/login',loginUser) 
router.post('/re_verify',reVerify)  
router.get('/allUser',getAllUser)  
router.patch('/user/:id',updateUser)  



export default router