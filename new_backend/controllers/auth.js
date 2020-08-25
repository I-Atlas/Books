const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

require('dotenv').config()
const JWT= process.env.JWT

const login = async (req, res) => {
    const candidate = await db.User.findOne({ where: { email: req.body.email } });

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, JWT, {expiresIn: 60 * 60})

            return res.status(200).json({
                token:`Bearer ${token}`
            })

        } else {
            return res.status(401).json({
                message: 'Wong password.'
            })
        }

    } else {
        return res.status(404).json({
            message: 'User not found.'
        })
    }
}



const register = async (req, res) => {
    // find user email
    const candidate = await db.User.findOne({ where: { email: req.body.email } });

    if (candidate) {
        return res.status(409).json({
            message: 'Email already used.'
        })

    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        try {
            await db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(password, salt),
            })

            return res.status(201).json({
                message: `User successfully created!.`
            })
            
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