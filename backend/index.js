const express = require("express")
const dotenv = require("dotenv")
const sessions = require("express-session")

const routes = require("./routes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const oneHour = 1000 * 60 * 60

app.use(
    sessions({
        secret: process.env.SECRETKEY,
        saveUninitialized: true,
        cookie: { maxAge: oneHour },
        resave: false,
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.listen(PORT)
