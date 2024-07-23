const express = require("express")
const sendMailController = require("../controller/sendEmail")

const sendEmailRoute = express.Router()

sendEmailRoute.post("/sendEmail", sendMailController.sendEmail)

module.exports = sendEmailRoute