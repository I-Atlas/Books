const db = require('../models')



const getOrders = async (req, res) => {
  const {
    userId
  } = req.query

  try {
    const orderList = await db.Order.findAll({
      where: {
        userId
      }
    })

    return res.json(orderList)

  } catch (error) {
    console.log('Get Orders Error:', error)
    return res.status(500).json({
      error: error.message
    })
  }
}

const createOrder = async (req, res, next) => {
  const {
    userId,
    books
  } = req.body

  try {
    const saveOrder = await Order.create({
      userId
    })

    const checkBooks = books.map(async (item) => {
      try {
        const book = await db.Book.findOne({
          where: {
            id: item.id
          }
        });
        return {
          bookId: item.id,
          isOk: !!book
        };
        // if (!book) {
        //   return {
        //     bookId: item.id,
        //     isOk: false
        //   };
        // }
      } catch (error) {
        return {
          bookId: item.id,
          isOk: false
        };
      }
    })

    const checkBookResult = await Promise.all(checkBooks);

    const resultChecking = checkBookResult.filter((item) => !item.isOk)

    const booksPromises = books.map(async (item) => {
      // const book = await db.Book.findOne({
      //   where: {
      //     id: item.id
      //   }
      // })

      // if (!book) {
      //   // return res.status(404).json({
      //   throw {
      //     message: `Book with id ${item.id} not found.`
      //   }
      //   // })
      // }

      const order = {
        orderId: saveOrder.id,
        bookId: item.id
      }

      return BookOrder.create(order);
    })

    await Promise.all(booksPromises);

    return res.status(201).json({
      message: `Order №${saveOrder.id} successfully created`
    })

  } catch (error) {
    console.log('Get Orders Error:', error)
    return res.status(500).json({
      error: error.message
    })
  }
}

module.exports = {
  getOrders,
  createOrder
}