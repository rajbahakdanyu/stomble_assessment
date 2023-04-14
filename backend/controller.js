const crypto = require("crypto-js")
const { PrismaClient } = require("@prisma/client")
const fs = require("fs")
const vCard = require("vcard4")

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
    var { userId } = req.body
    var { path } = req.file

    var contact = await fs.promises
        .readFile(path)
        .then((contact) => contact.toString())

    var card = vCard.parse(contact)

    try {
        await prisma.contact.create({
            data: {
                name: card.getProperty("FN")[0].value,
                email: card.getProperty("EMAIL")[0].value,
                telephone: {
                    create: [
                        {
                            label: "mobile",
                            number: card.getProperty("TEL")[0].value,
                        },
                    ],
                },
                userId: parseInt(userId),
            },
        })

        res.json({
            statusCode: 200,
            body: "File uploaded successfully",
        })
    } catch (error) {
        console.log(error)
        res.json({
            statusCode: 400,
            body: "Sorry file could not be uploaded",
        })
    }
}

async function GetContacts(req, res) {
    try {
        var contacts = await prisma.contact.findMany({
            where: { userId: parseInt(req.params.id) },
        })

        var number = await prisma.tel.findMany({
            where: { contactId: parseInt(contacts[0].id) },
        })

        contacts[0]["tel"] = number[0].number

        res.json({
            statusCode: 200,
            body: contacts,
        })
    } catch (error) {
        console.log(error)
        res.json({
            statusCode: 200,
            body: "No contacts found",
        })
    }
}

module.exports = { Register, Login, ImportVCard, GetContacts }
