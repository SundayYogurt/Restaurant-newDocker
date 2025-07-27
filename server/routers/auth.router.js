const authController = require("../controllers/auth.controller")

const express = require("express");
const router = express.Router();

//POST http://localhost:3000/api/v1/register/signup
router.post("/signup",authController.signUp);

router.post("/signin",authController.signIn);
module.exports = router;