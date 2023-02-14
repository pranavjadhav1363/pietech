require('dotenv').config()

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema')
const PRIVATE_KEY = process.env.PRIVATE_KEY
console.log(PRIVATE_KEY)


router.post('/', async (req, res) => {

    try {
        const body = req.body
        console.log(body)
        for (const key in body) {
            if (body[key] === null || body[key] === undefined || body[key] === "") {
                return res.status(409).json({ success: false, response: "Please Enter All Details" })
            }
        }
        const CheckEmailidExist = await User.findOne({ Email: req.body.Email })
        if (CheckEmailidExist) {
            return res.status(409).json({ success: false, response: "EmailId Already Exists" })
        }
        const CheckPhonenoExist = await User.findOne({ Phoneno: req.body.Phoneno })
        if (CheckPhonenoExist) {
            return res.status(409).json({ success: false, response: "Phone no Already Exists" })
        }
        const Phoneno = req.body.Phoneno
        console.log(Phoneno)
        if (Phoneno.toString().length !== 10) {
            return res.status(409).json({ success: false, response: "Enter Valid Phone no" })

        }
        const Password = req.body.Password
        if (Password.length < 8) {
            return res.status(409).json({ success: false, response: "Password Should Be of Atleast Length 8" })
        }
        const saltRounds = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.Password, saltRounds)

        const CreateUser = await User.create({
            Name: req.body.Name,
            Email: req.body.Email,
            Phoneno: req.body.Phoneno,
            Gender: req.body.Gender,
            Password: secpass
        })
        if (CreateUser) {
            const jwtdata = await {
                user: {
                    id: CreateUser._id
                }
            }
            const jwttoken = await jwt.sign(jwtdata, PRIVATE_KEY)
            return res.status(200).json({ success: true, response: jwttoken })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, response: "Internal Server Error Occured", error: error })
    }
})


module.exports = router