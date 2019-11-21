const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user)
      return res
        .status(400)
        .json(log.ApiResponse(false, 400, "user not found!"));
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res
          .status(400)
          .json({ success: true, code: 400, message: "incorrect password!" });
      else {
        const payload = { id: user.id };
        jwt.sign(payload, "keys", { expiresIn: "3d" }, (err, token) => {
          return res.status(200).json({
            success: true,
            code: 200,
            message: "login successful!",
            user: user,
            token: "Bearer " + token
          });
        });
      }
    });
  });
};
module.exports = { loginUser };
