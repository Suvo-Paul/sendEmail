const express = require("express")

const app = express()
app.use(express.json())
const port = 3000

const sendEmailRoute = require("./routes/sendEmailRoute")

app.use("/api/email", sendEmailRoute)

app.listen(port, () => {
    console.log("Server is running on", port);
})