const db = require('../models')

const getOrders = async (req, res) => {
    const { userId } = req.query

    try {
        const orderList = await db.Order.findAll({ where: { userId } })

        return res.json(orderList)

    } catch (error) {
        console.log('Get Orders Error:', error)
        return res.status(500).json({ error: error.message} )
    }
}

 const createOrder = async (req, res, next) => {
    const { userId } = req.body

    try {
      const saveOrder = await Order.create({ userId })
  
      req.body.books.forEach(async (item) => {
        const book = await db.Book.findOne({ where: { id: item.id } })
  
        if (!book) {
          return res.status(404).json({
            message: "Book not found."
          })
        }
  
        const order = {
          orderId: saveOrder.id,
          bookId: item.id
        }
  
        await BookOrder.create(order);
      })
  
      return res.status(201).json({
        message: `Order №${saveOrder.id} successfully created.`
      })

    } catch (error) {
        console.log('Get Orders Error:', error)
        return res.status(500).json({ error: error.message} )
    }
}

module.exports = {
    getOrders,
    createOrder
}