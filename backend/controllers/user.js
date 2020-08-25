const db = require('../models')

const getAllUsers = async (req, res) => {
    try {
        const userList = await db.User.findAll({})

        return res.json(userList)

    } catch (error) {
        console.log('Get All Users Error:', error)
        return res.status(500).json({ error: error.message} )
    }
}

const updateUserInfo = async (req, res) => {
    const { first_name, last_name, avatar, id } = req.body

    try {
        db.User.update({
            first_name,
            last_name,
            avatar
        }, { where: { id } })

        return res.status(200).json({ message: "User information successfully updated!" })

    } catch (error) {
        console.log('Update User Information Error:', error);
        return res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.body

    try {
        await db.User.destroy({ where: { id } })
        
        return res.status(200).json({ message: "Account successfully deleted." })

    } catch (error) {
        console.log('Delete User Error:', error);
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllUsers,
    updateUserInfo,
    deleteUser
}