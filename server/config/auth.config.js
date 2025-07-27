const dotenv = require("dotenv") // เรียกใช้ dotenv เพื่อโหลด environment variables
dotenv.config()                  // โหลดค่าจากไฟล์ .env

module.exports = {
    secret: process.env.JWT_SECRET // ส่งออกค่า secret สำหรับ JWT จาก .env
}