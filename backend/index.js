const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")

const routes = require("./routes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.listen(PORT)
