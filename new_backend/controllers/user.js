const db = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const userList = await db.User.findAll({});

        // const feedback = await db.feedback.findOne({
        //     where: {
        //      id: 2
        //     },
        //     include: [{
        //         model: db.user
        //     }]
        // })

        return res.json(userList)
    } catch (error) {
        console.log('getAllUsers error:', error);
        
        return res.status(500).json({error: error.message})
    }
}

const newUser = async (req, res) => {
    try {
        db.User.create({
            username: "HelloWorld",
            email: "hw@gmail.com",
            password: "hellowotld",
            first_name: "Hello",
            last_name: "World",
            avatar: `helloworld{id}.png`
        })
        return res.send('User has been created!')
    }catch (error) {
        console.log('newUser error:', error);
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllUsers,
    newUser
}