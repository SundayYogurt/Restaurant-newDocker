const authController = require("../controllers/auth.controller") // import controller สำหรับ auth

const express = require("express"); // import express
const router = express.Router();    // สร้าง router object

// POST สมัครสมาชิก
router.post("/signup",authController.signUp); // path /api/v1/register/signup

// POST เข้าสู่ระบบ
router.post("/signin",authController.signIn); // path /api/v1/register/signin

module.exports = router; // ส่งออก router