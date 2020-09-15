const bcrypt = require("bcrypt");
const db = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const userList = await db.User.findAll({});

    return res.json(userList);
  } catch (error) {
    console.log("Get All Users Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.User.findOne({
      id,
    });

    return res.json(user);
  } catch (error) {
    console.log("Get One User Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { username, first_name, last_name, password } = req.body;

  const userPayload = {
    username,
    first_name,
    last_name,
  };
  if (req.file) {
    userPayload.avatar = req.file.filename;
  }
  try {
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    try {
      bcrypt.compareSync(password, user.password);
    } catch (error) {
      return res.status(400).json({
        error: `Password does not match, ${error}`,
      });
    }
    await db.User.update(userPayload, {
      where: {
        id,
      },
    });

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      message: "User information successfully updated",
      // token:`Bearer ${token}`,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Update User Information Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // body protect

  try {
    await db.User.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Account successfully deleted",
    });
  } catch (error) {
    console.log("Delete User Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUserInfo,
  deleteUser,
};
