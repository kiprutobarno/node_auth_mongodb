const express = require("express");
const register = require("../controller/users");
const router = express.Router();

router.get("/users", register.users);
module.exports = router;
