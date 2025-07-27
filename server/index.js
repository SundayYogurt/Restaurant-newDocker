const express = require('express') // เรียกใช้ express สำหรับสร้าง web server
const dotenv  = require('dotenv')  // เรียกใช้ dotenv เพื่อโหลด environment variables จากไฟล์ .env
const app = express()              // สร้าง instance ของ express app
dotenv.config();                   // โหลดค่าตัวแปรจากไฟล์ .env เข้าสู่ process.env

const PORT = process.env.PORT || 3000; // กำหนด port ที่จะใช้รัน server

const restaurantRouter = require("./routers/restaurant.router") // import router สำหรับ restaurant API
const authRouter = require("./routers/auth.router")             // import router สำหรับ auth API

const db = require("./models/index") // import models และเชื่อมต่อฐานข้อมูล
const role = db.Role                 // ดึง model role สำหรับสร้าง role เริ่มต้น

// ฟังก์ชันสร้าง role เริ่มต้นในฐานข้อมูล
const initRole = () => {
  role.create({id:1, name:"user"})      // สร้าง role user
  role.create({id:2, name:"moderator"}) // สร้าง role moderator
  role.create({id:3, name:"admin"})     // สร้าง role admin
}

// sync schema กับฐานข้อมูล (force: true จะลบและสร้างใหม่ทุกครั้ง)
db.sequelize.sync({force: true}).then(()=>{
   initRole();                         // สร้าง role เริ่มต้น
   console.log("Drop and Sync")        // log เมื่อ sync สำเร็จ
})

app.use(express.json())                // Middleware สำหรับแปลง request body เป็น json
app.use(express.urlencoded({ extended: true})) // Middleware สำหรับแปลง urlencoded เป็น json

app.use('/api/v1/restaurant' ,restaurantRouter); // กำหนด router สำหรับ path /api/v1/restaurant
app.use('/api/v1/register', authRouter)          // กำหนด router สำหรับ path /api/v1/register

app.get('/', (req, res) => { // route หลัก (root) สำหรับเช็คว่า server ทำงาน
  res.send('Restful API')    // ส่งข้อความกลับ
})

app.listen(PORT,() => {
  console.log("Listening to http://localhost:" + PORT) // log เมื่อ server ทำงาน
});