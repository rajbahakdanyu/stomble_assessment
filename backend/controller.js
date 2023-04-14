const crypto = require("crypto-js")
const { PrismaClient } = require("@prisma/client")
const fs = require("fs")
const vCard = require("vcf")

const prisma = new PrismaClient()

async function Register(req, res) {
    var { email, password } = req.body

    try {
        await prisma.user.create({
            data: {
                email: email,
                password: crypto.SHA256(password).toString(crypto.enc.Base64),
            },
        })

        res.json({ statusCode: 200, body: "User created successfully" })
    } catch (error) {
        res.json({ statusCode: 400, body: "User already exists" })
    }
}

async function Login(req, res) {
    var { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (
            user.password == crypto.SHA256(password).toString(crypto.enc.Base64)
        ) {
            res.json({ statusCode: 200, body: "User exists" })
        } else {
            res.json({ statusCode: 400, body: "Password is incorrect" })
        }
    } catch (error) {
        res.json({ statusCode: 400, body: "User not found" })
    }
}

async function ImportVCard(req, res) {
    var { usedId } = req.body
    var { path } = req.file

    var contact = await fs.promises
        .readFile(path)
        .then((contact) => contact.toString())

    var card = new vCard().parse(contact)

    try {
        await prisma.contact.create({
            data: card.data,
        })
    } catch (error) {}

    res.json({ message: "Successfully uploaded files" })
}

module.exports = { Register, Login, ImportVCard }
