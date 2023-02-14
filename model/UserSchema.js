const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Phoneno: {
        type: Number,
        unique: true,
        minLength: 10,
        maxLength: 10,
    },
    Gender: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        minLength: 8,
    }
})
const User = mongoose.model('user', UserSchema);
module.exports = User