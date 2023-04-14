const crypto = require("crypto-js")
const { PrismaClient } = require("@prisma/client")

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

module.exports = { Register, Login }
