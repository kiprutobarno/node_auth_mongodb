const User = require("../model/User");

const users = async (req, res) => {
  User.find().then(users => {
    if (users.length === 0)
      return res
        .status(400)
        .json({ success: false, code: 400, message: "no user(s) found!" });
    else {
      return res.status(200).json({
        success: true,
        code: 200,
        message: "users retrieved successfuly!",
        users: users
      });
    }
  });
};
module.exports = { users };
