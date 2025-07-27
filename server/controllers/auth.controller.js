const db = require("../models/index.js") // import models
const User = db.User;                    // ดึง model user
const Role = db.Role;                    // ดึง model role
const bcrypt = require("bcryptjs");      // import bcrypt สำหรับ hash password
const jwt = require("jsonwebtoken");     // import jwt สำหรับสร้าง token
const { Op } = require("sequelize");     // import Op สำหรับ query เงื่อนไข
const config = require("../config/auth.config.js") // import JWT secret
const authController = {}                // สร้าง object สำหรับ controller

// ฟังก์ชันสมัครสมาชิก
authController.signUp = async (req, res) => {
    const { username, name, email, password } = req.body; // รับข้อมูลจาก body
    if (!username || !name || !email || !password) {      // ตรวจสอบข้อมูลครบหรือไม่
        res.status(400).send({ message: "Please provide all required fields" })
        return
    }
    await User.findOne({ where: { username } })           // ตรวจสอบว่ามี username นี้หรือยัง
        .then((user) => {
            if (user) {
                res.status(400).send({ message: "Username is already existed" })
                return
            }
            const newUser = {
                username,
                name,
                email,
                password: bcrypt.hashSync(password, 8)    // hash password ก่อนบันทึก
            }
            User.create(newUser).then((user) => {
                // ถ้ามี roles ส่งมาใน body
                if (req.body.roles) {
                    // ค้นหา role ที่ตรงกับชื่อใน body
                    Role.findAll({
                        where: {
                            name: { [Op.or]: req.body.roles }
                        }
                    }).then((roles) => {
                        if (roles?.length === 0) {
                            user.setRoles([1]).then(() => {
                                res.send({ message: "User registered successfully3" })
                            })
                        } else {
                            user.setRoles(roles).then(() => {
                                res.send({ message: "User registered successfully1" })
                            })
                        }
                    })
                } else {
                    user.setRoles([1]).then(() => { // ถ้าไม่มี roles ให้เป็น user
                        res.send({ message: "User registered successfully2" })
                    })
                }
            }).catch((error) => {
                res.status(500).send({ message: error.message || "Something error while registering a new user" })
            })
        })
}

// ฟังก์ชันเข้าสู่ระบบ
authController.signIn = async (req, res) => {
    const { username, password } = req.body; // รับข้อมูลจาก body

    //validate
    if (!username || !password) {
        res.status(400).send({ message: "Username or password are missing!" })
        return
    }

    await User.findOne({
        where: { username: username }
    }).then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not found" })
            return
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password) // ตรวจสอบ password
        if (!passwordIsValid) {
            res.status(401).send({ message: "Invalid password" })
        }
        //Valid user
        const token = jwt.sign({ username: user.username }, config.secret, { // สร้าง JWT token
            expiresIn: 86400, // 24 ชั่วโมง
        })
        const authorities = [];
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLES_" + roles[i].name.toUpperCase()) // สร้าง array ของ role
            }
            res.send({
                token: token,                // ส่ง token กลับ
                authorities: authorities,    // ส่ง role กลับ
                userInfo: {                  // ส่งข้อมูล user กลับ
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
            })
        })
    }).catch((error) => {
        res.status(500).send({ message: error.message || "Something error while signin" })
    })

}

module.exports = authController // ส่งออก controller