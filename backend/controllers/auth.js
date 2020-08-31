const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')

require('dotenv').config()
const secret= process.env.JWT_SECRET

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await db.User.findOne({ where: { email } })

    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" })

            return res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                token:`Bearer ${token}`
            })
        }
        
        return res.status(401).json({
            message: 'Wrong email or password'
        })
        

    }
    return res.status(404).json({
        message: 'User not found'
    })
    
}

const register = async (req, res) => {
    try {
        
        const { username, email, password } = req.body
        const user = await db.User.findOne({ where: { email } })
    
        if (user) {
            return res.status(400).json({
                message: 'Email already used'
            })
    
        } else {
            const hashedPassword = await bcrypt.hash(password, 12)
    
            
            await db.User.create({
                username,
                email,
                password: hashedPassword
                
            })

            return res.status(201).json({ message: "Account successfully created!" })
                
            
        }
    } catch (error) {
        console.log('Register Error:', error);
        return res.status(500).json({error: error.message})
        
    }
}

const profile = async (req, res) => {
    const { email } = req.params;

    try {
      const user = await db.User.findOne({ where: { email } })
  
      if (!user) {
        return res.status(404).json({ message: "User not found." })
      }
  
      const orders = await db.Order.findAll({
        include: [
            {
                model: db.User
            }
        ]
        //   {
        //     model: db.Book,
        //     as: "Books",
        //     attributes: ["id", "name", "price"]
        //   }
        // ]
      })
  
      return res.status(200).json({ user, orders });
    } catch (error) {
        console.log('Register Error:', error);
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    login,
    register,
    profile
}