const User = require("../model/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  await User.findOne({ email: req.body.email }).then(emailExists => {
    if (emailExists)
      return res
        .status(409)
        .json({ success: false, code: 409, message: "email already exists!" });

    let user = req.body;
    const newUser = new User(user);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser
          .save()
          .then(saved => {
            if (!saved)
              return res.status(400).json({
                success: false,
                code: 400,
                message: "an error occured, please try again!"
              });
            else
              return res.status(201).json({
                success: true,
                code: 201,
                message: "registration successful!"
              });
          })
          .catch(err => {
            return res.status(500).json({
              success: false,
              code: 500,
              message: "an error occured, please try again!"
            });
          });
      });
    });
  });
};

module.exports = { createUser };
