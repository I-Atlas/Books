const db = require('../db/models');


const getAll = async (req, res) => {
    try {
        const userList = await db.user.findAll({});

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
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAll
}