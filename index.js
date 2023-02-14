require('dotenv').config()
const mongoose = require('mongoose')
// require('./db/db')
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const Register = require('./routes/Register')
const Login = require('./routes/Login')
const FetchDetails = require('./routes/FetchDetails')

app.use(express.json())
const uri = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(uri, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
})
app.use('/register', Register)
app.use('/login', Login)
app.use('/fetchdetails', FetchDetails)

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))