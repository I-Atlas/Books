const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')

require('dotenv').config()
// const JWT= process.env.JWT
const secret= process.env.JWT_SECRET

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await db.User.findOne({ where: { email } })

    if (user) {
        const isMatch = bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" })

            return res.json({
                token:`Bearer ${token}`
            })
        }
        
        return res.status(401).json({
            message: 'Wrong email or password.'
        })
        

    }
    return res.status(404).json({
        message: 'User not found.'
    })
    
}



const register = async (req, res) => {
    const { username, email, password } = req.body
    const user = await db.User.findOne({ where: { email } })

    if (user) {
        return res.status(400).json({
            message: 'Email already used.'
        })

    } else {
        const hashedPassword = await bcrypt.hash(password, 12)

        try {
            await db.User.create({
                username,
                email,
                password: hashedPassword
               
            })

            return res.status(201).json({ message: "Account successfully created!" })
            
        } catch (error) {
            console.log('Register Error:', error);
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = {
    login,
    register
}