const bcrypt = require("bcrypt");
const db = require("../models");

require("dotenv").config();
const { createToken } = require("../utils/token");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const candidate = await db.User.findOne({
        where: {
            email,
        },
    });

    if (candidate) {
        return res.status(400).json({
            message: "Email already used",
        });
    }

    const user = await db.User.create({
        username,
        email,
        password: hashedPassword,
    });

    const token = createToken(user, 60 * 15);
    const refreshToken = createToken(user, 60 * 60 * 72);

    user.refresh_token = refreshToken;
    await user.save();

    return res.status(201).json({
      message: "Account successfully created",
      refreshToken,
      token,
    });
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      const refreshToken = createToken(user, 60 * 60 * 72);
      const token = createToken(user, 60 * 15);

      user.refresh_token = refreshToken;
      await user.save();

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        token: `Bearer ${token}`,
        createdAt: user.createdAt,
      });
    }

    return res.status(401).json({
      message: "Wrong email or password",
    });
  }
  return res.status(404).json({
    message: "User not found",
  });
};

const profile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orders = await db.Order.findAll({
      include: [
        {
          model: db.User,
        },
      ],
    });

    return res.status(200).json({
      user,
      orders,
    });
  } catch (error) {
    console.log("Profile Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  profile,
};
