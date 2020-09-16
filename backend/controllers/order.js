const db = require("../models");

const getOrders = async (req, res) => {
  const { userId } = req.query;

  try {
    const orderList = await db.Order.findAll({
      where: {
        user_id: userId,
      },
    });

    return res.res.status(200).json(orderList);
  } catch (error) {
    console.log("Get Orders Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const createOrder = async (req, res, next) => {
  const { userId, books } = req.body;

  try {
    const saveOrder = await Order.create({
      user_id: userId,
    });

    // const checkBooks = books.map(async (item) => {
    // })

    // const checkBookResult = await Promise.all(checkBooks);

    // const resultChecking = checkBookResult.filter((item) => !item.isOk)

    const booksPromises = books.map(async (item) => {
      try {
        const book = await db.Book.findOne({
          where: {
            id: item.id,
          },
        });

        if (!book) {
          return res.status(404).json({
            message: "Book not found",
          });
        }
      } catch (error) {
        console.log("Get Book Promises Error:", error);
        return res.status(500).json({
          error: error.message,
        });
      }

      const order = {
        order_id: saveOrder.id,
        book_id: item.id,
      };

      await db.OrderBook.create(order);
    });

    await Promise.all(booksPromises);

    return res.status(201).json({
      message: `Order №${saveOrder.id} successfully created`,
    });
  } catch (error) {
    console.log("Create Order Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
};
