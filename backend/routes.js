const express = require("express")
const multer = require("multer")
const os = require("os")
const controller = require("./controller")

const router = express.Router()
const upload = multer({ dest: os.tmpdir() })

router.post("/register", controller.Register)

router.post("/login", controller.Login)

router.post("/import", upload.single("vcard"), controller.ImportVCard)

router.get("/getContacts/:id", controller.GetContacts)

router.post("/create", controller.CreateEntry)

module.exports = router
