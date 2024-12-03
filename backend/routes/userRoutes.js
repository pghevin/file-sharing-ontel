const { register, login } = require("../services/userService");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
