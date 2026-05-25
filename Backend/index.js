require("dotenv").config()

const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// =======================
// MongoDB Connection
// =======================

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


// =======================
// Nodemailer Setup
// =======================

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


// =======================
// Server
// =======================

app.listen(process.env.PORT || 5000, function () {
    console.log(`Server Started on Port ${process.env.PORT}`)
})