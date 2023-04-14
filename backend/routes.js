const express = require("express")
const multer = require("multer")
const os = require("os")
const controller = require("./controller")

const router = express.Router()
const upload = multer({ dest: os.tmpdir() })

router.post("/register", controller.Register)

router.post("/login", controller.Login)

router.post("/import/:id", upload.single("vcard"), controller.ImportVCard)

router.get("/getContacts/:id", controller.GetContacts)

router.post("/create", controller.CreateEntry)

router.delete("/delete/:id", controller.DeleteEntry)

module.exports = router
