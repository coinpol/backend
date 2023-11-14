import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserModel from '../Model/UserModel.js';
import nodemailer from 'nodemailer'
import mongoose from 'mongoose';



const userOTPData = {};
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const registerUser = async (req, res) => {


    // hashing using bcrypt



    const { email } = req.body
    try {

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false,
        //     requireTLS: true,
        //     auth: {
        //         user: process.env.MAIL,
        //         pass: process.env.PASSCODE,
        //     },
        //     tls: {
        //         ciphers: "SSLv3",
        //     },
        // });

        // const otp = generateOTP();
        // userOTPData[email] = otp;

        // const mailOptions = {
        //     // from: '',
        //     to: email,
        //     subject: 'Your OTP Code',
        //     text: `Your OTP code is: ${otp}`
        // };


        const userOld = await UserModel.findOne({ email })
        if (userOld) {
            res.status(400).json({ "msg": "user already registerd" })
        } else {

            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.log('Error sending email:', error);
            //         res.status(500).json({ message: 'Failed to send OTP' });
            //     } else {
            //         console.log('Email sent:', info.response);
            //         res.json({ message: 'OTP sent successfully' });
            //     }
            // });


            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPass
            // req.body.otp = otp

            const newUser = new UserModel(req.body)

            const user = await newUser.save();

            res.status(200).json({ user })

        }



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user.otp == otp) {

            const update = await UserModel.findOneAndUpdate(
                { _id: user._id },
                { $set: { otp: 0, otpVerify: true } },
                { new: true }
            )

            res.status(200).json({ "msg": "success" })
        } else {
            res.status(400).json({ "msg": "Invalid otp" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}

//login user
export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email })

        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {
                res.status(400).json({ message: "Wrong password" })
            } else {
                if (!user.otpVerify) {
                    //jwt create
                    const token = jwt.sign({
                        username: user.email, id: user._id
                    }, "ajith", { expiresIn: "5h" })


                    res.status(200).json({ user, token, message: "success" })
                } else {
                    res.status(404).json({ message: "Your not verified User Please Verify" })
                }

            }

        } else {
            res.status(400).json({ message: "User Does not exists" })
            console.log("user blocked");

        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}

export const reVerify = async (req, res) => {

    const { email } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user.otpVerify) {
            res.status(400).json({ message: "User Already verified" })
        } else {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.PASSCODE,
                },
                tls: {
                    ciphers: "SSLv3",
                },
            });

            const otp = generateOTP();
            userOTPData[email] = otp;

            const mailOptions = {
                // from: '',
                to: email,
                subject: 'Your OTP Code',
                text: `Your OTP code is: ${otp}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    res.status(500).json({ message: 'Failed to send OTP' });
                } else {
                    console.log('Email sent:', info.response);
                    res.json({ message: 'OTP sent successfully' });
                }
            });

            // res.status(200).json({ message: "otp sent success" })
        }

    } catch (error) {
        res.status(500).json({ "message": error.message })

    }
}



// updateUser
export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findOne({ _id: id })
        if (user) {
            const update = await UserModel.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            )
            res.status(200).json({ update, message: "User udpate SuccessFully" })
        }

    } catch (error) {
        res.status(500).json({ "message": error.message })

    }

}


// getAllUser
export const getAllUser = async (req, res) => {
    try {
        const  allUser  = await UserModel.find()
        
        if (allUser) {
            const adminFilter = allUser?.filter((item) => {
                if (item?.isAdmin === false) {
                    return item
                }
            })
            res.status(200).json({ adminFilter, message: "All user get successfully" })
        }

    } catch (error) {
        res.status(500).json({ "message": error.message })

    }
}

//get all admin list

export const getAllAdmin = async (req, res) => {
    try {
        const  allUser  = await UserModel.find()
        
        if (allUser) {
            const adminFilter = allUser?.filter((item) => {
                if (!item?.isAdmin === false) {
                    return item
                }
            })
            res.status(200).json({ adminFilter, message: "All user get successfully" })
        }

    } catch (error) {
        res.status(500).json({ "message": error.message })

    }
}