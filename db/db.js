const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/pietech', () => {
    console.log("database connected successfully")
})