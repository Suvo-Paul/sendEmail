"use strict"
const { EMAIL, PASSWORD } = require("../env")
const Mailgen = require("mailgen")
const nodemailer = require("nodemailer")


const sendEmail = async (req, res) => {
    try {

        const { userEmail } = req.body

        let config = {
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }

        let transport = nodemailer.createTransport(config)

        let mailGenerater = new Mailgen({
            theme: "default",
            product: {
                name: "Mailgen",
                link: "https://mailgen.js/"
            }
        })

        let response = {
            body: {
                name : "Suvo Paul",
                intro: "Your bill has arrived",
                table: {
                    data: [
                        {
                            item: "Nodemailer Stack Book",
                            description: "A backend stack app",
                            price: "$10"
                        }
                    ]
                },
                outro: "Looking forword to do more business"
            }
        }

        let mail = mailGenerater.generate(response)


        let msg = {
            from: EMAIL,
            to: userEmail,
            subject: "Place Order",
            html: mail
        }

        transport.sendMail(msg).then(() => {
            return res.status(201).send({
                message: "Email sent successfully"
            })
        }).catch((error) => {
            return res.status(500).send({ error })
        })

        res.status(201).send({
            success: true,
            message: "Mail sent successfully"
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error : error.message
        })
    }
}

module.exports = { sendEmail }