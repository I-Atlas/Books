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

const updateUserInfo = async (req, res) => {
    try {
        db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            avatar: req.body.avatar
        }, {
            where: {
              id: req.body.id
            }
        })
        return res.status(201).json({
            message: `User information successfully updated!.`
        })

    } catch (error) {
        console.log('Update User Info Error:', error);
        return res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        db.User.destroy({
            where: { id: req.body.id }
        })
        
        return res.send(`Row has been deleted!`)

    }catch (error) {
        console.log('Delete user error:', error);
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllUsers,
    updateUserInfo,
    deleteUser
}