require('dotenv').config()

const express = require('express')
const User = require('../model/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY

const router = express.Router()



router.post('/', async (req, res) => {
    try {
        const CheckIfEmailExist = await User.findOne({ Email: req.body.Email })
        if (CheckIfEmailExist) {
            const validUserWithEmail = await bcrypt.compare(req.body.Password, CheckIfEmailExist.Password);
            if (validUserWithEmail) {
                const jwtdata = await {
                    user: {
                        id: CheckIfEmailExist._id
                    }
                }
                const jwttoken = await jwt.sign(jwtdata, PRIVATE_KEY)
                return res.status(200).json({ success: true, response: jwttoken })
            } else {
                return res.status(409).json({ success: false, response: "Inavlid Login Credentials" })
            }
        } else {
            return res.status(409).json({ success: false, response: "Inavlid Login Credentials" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, response: "Internal Server Error Occured" })

    }
})


module.exports = router