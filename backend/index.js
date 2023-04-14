const express = require("express")
const dotenv = require("dotenv")

const routes = require("./routes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use("/api", routes)

app.listen(PORT)
