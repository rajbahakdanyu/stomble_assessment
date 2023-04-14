var express = require("express")
var dotenv = require("dotenv")

dotenv.config()

var app = express()
var PORT = process.env.PORT || 8080

var routes = require("./routes")

app.use("/api", routes)

app.listen(PORT)
