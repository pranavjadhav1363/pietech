require('dotenv').config()

const express = require('express')
const User = require('../model/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const authUser = require('../middleware/auth');
const PRIVATE_KEY = process.env.PRIVATE_KEY

const router = express.Router()


router.get('/', authUser, async (req, res) => {
    try {
        const getuserid = await req.user.id
        const getuserdetails = await User.findById(getuserid).select({ Password: 0 })
        return res.status(200).json({ success: true, response: getuserdetails })


    } catch (error) {
        return res.status(500).json({ success: false, response: "Internal Server Error Occured" })

    }
})

module.exports = router