const jwt = require("jsonwebtoken")

require('dotenv').config()
const secret = process.env.JWT_SECRET || "helloworldiliya"

const createToken = (user, expiresIn) => {
  try {
    const token = jwt.sign({
        email: user.email,
        userId: user.id,
      },
      secret, {
        expiresIn
      }
    )

    return token;
  } catch (error) {
    console.log(`Create Token Error: ${error}`);
    throw {
      status: 500,
      message: error.message
    };
  }
}

module.exports = {
  createToken,
}