require("dotenv").config()

const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully")
    })
    .catch((err) => {
        console.log(err)
    })

// Database
const db = mongoose.connection.useDb("Bulkmail")

// Schema
const emailSchema = new mongoose.Schema({
    email: String
})

// Model
const EmailModel = db.model("emaillist", emailSchema)


// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})


// =======================
// Send Mail API
// =======================

app.post("/sendmail", async function (req, res) {

    const msg = req.body.msg
    const emailList = req.body.emailList

    try {

        for (let i = 0; i < emailList.length; i++) {

            // Store Email
            await EmailModel.create({
                email: emailList[i]
            })

            // Send Email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: emailList[i],
                subject: "Bulk Mail Testing",
                text: msg
            })

            console.log("Mail sent to:", emailList[i])
        }

        res.send(true)

    } catch (error) {

        console.log(error)
        res.send(false)
    }
})



// new schema to add userdata
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const UserModel = db.model("users", userSchema)

// Signup
app.post("/adduser", async (req, res) => {

    try {
        const { username, password } = req.body
        await UserModel.create({
            username: username,
            password: password
        })
        console.log("User added")
        res.send(true)

    } catch (error) {

        console.log(error)
        res.send(false)
    }
})
// Login function

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body

        const user = await UserModel.findOne({
            username: username,
            password: password
        })

        if (user) {
            res.send(true)
            console.log("login successfull")
        } else {
            res.send(false)
        }

    } catch (error) {

        console.log(error)
        res.send(false)
    }
})
// History function
const HistoryModel = db.model("emaillist", emailSchema)
app.get("/history", async (req, res) => {

    const emails = await EmailModel.find()

    const emailList = emails.map((item) => item.email)

    res.json(emailList)
})
// Server

app.listen(process.env.PORT || 5000, function () {
    console.log(`Server Started on Port ${process.env.PORT}`)
})