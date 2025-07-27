# Restaurant API Server

ระบบนี้เป็น RESTful API สำหรับจัดการข้อมูลร้านอาหารและผู้ใช้งาน โดยใช้ Node.js, Express, Sequelize (เชื่อมต่อฐานข้อมูล), และโครงสร้างแบบ MVC

---

## โครงสร้างโฟลเดอร์

```
server/
│   .env                  # กำหนด environment variables (เช่น DB, JWT, PORT)
│   Dockerfile.server     # สร้าง Docker image สำหรับ backend
│   index.js              # จุดเริ่มต้นของแอป
│   package.json          # ข้อมูล dependencies และ scripts
│
├── config/
│     ├── auth.config.js  # กำหนด JWT secret
│     └── db.config.js    # กำหนดค่าการเชื่อมต่อฐานข้อมูล
│
├── controllers/
│     ├── auth.controller.js        # จัดการสมัครสมาชิก/เข้าสู่ระบบ
│     └── restaurant.controller.js  # จัดการข้อมูลร้านอาหาร
│
├── models/
│     ├── db.js                    # สร้างและทดสอบ connection Sequelize
│     ├── index.js                 # รวมและเชื่อมโยง models
│     ├── restaurant.model.js      # โครงสร้างข้อมูลร้านอาหาร
│     ├── role.model.js            # โครงสร้างข้อมูล role
│     └── user.model.js            # โครงสร้างข้อมูลผู้ใช้
│
└── routers/
      ├── auth.router.js           # เส้นทาง API สำหรับ auth
      └── restaurant.router.js     # เส้นทาง API สำหรับร้านอาหาร
```

---

## การทำงานแบบ MVC

- **Model**: กำหนดโครงสร้างข้อมูลและเชื่อมต่อฐานข้อมูล (Sequelize)
- **Controller**: รับ request, ประมวลผล, ส่ง response
- **Router**: กำหนด path ของ API และเชื่อมต่อกับ controller

---

## คู่มือเริ่มต้นใช้งาน

1. **ตั้งค่าไฟล์ `.env`**  
   กำหนดค่าต่าง ๆ เช่น PORT, HOST, USER, PASSWORD, DB, JWT_SECRET ฯลฯ

2. **ติดตั้ง dependencies**  
   ```
   npm install
   ```

3. **รันเซิร์ฟเวอร์**  
   ```
   node index.js
   ```
   หรือใช้ Docker
   ```
   docker build -t restaurant-server -f Dockerfile.server .
   docker run -p 3000:3000 restaurant-server
   ```

4. **API Endpoint**  
   - ร้านอาหาร: `/api/v1/restaurant`
   - สมัครสมาชิก/เข้าสู่ระบบ: `/api/v1/register/signup`, `/api/v1/register/signin`

---

## อธิบายไฟล์แต่ละไฟล์

### Root

- **.env**  
  กำหนด environment variables สำหรับการเชื่อมต่อฐานข้อมูลและ JWT

- **Dockerfile.server**  
  สร้าง Docker image สำหรับ backend server

- **index.js**  
  จุดเริ่มต้นของแอป รัน Express, เชื่อมต่อ DB, sync schema, กำหนด router, เริ่ม server  
  - สร้าง role เริ่มต้น (user, moderator, admin)
  - กำหนด router สำหรับ restaurant และ auth

- **package.json**  
  รายละเอียด dependencies, scripts, ข้อมูลโปรเจกต์

---

### config/

- **auth.config.js**  
  โหลด JWT_SECRET จาก .env เพื่อใช้ในการเข้ารหัส/ถอดรหัส JWT token

- **db.config.js**  
  โหลดค่าการเชื่อมต่อฐานข้อมูลจาก .env และกำหนด pool สำหรับ Sequelize

---

### controllers/

- **auth.controller.js**  
  - `signUp`: สมัครสมาชิก, hash password, กำหนด role
  - `signIn`: login, ตรวจสอบ password, สร้าง JWT token

- **restaurant.controller.js**  
  - `create`: เพิ่มร้านอาหารใหม่
  - `getAll`: ดึงข้อมูลร้านอาหารทั้งหมด
  - `getById`: ดึงข้อมูลร้านอาหารตาม id
  - `updateById`: แก้ไขข้อมูลร้านอาหาร
  - `deleteById`: ลบร้านอาหาร

---

### models/

- **db.js**  
  สร้าง Sequelize instance, เชื่อมต่อฐานข้อมูล, ทดสอบ connection

- **index.js**  
  รวม models ทั้งหมด, กำหนดความสัมพันธ์ (user <-> role)

- **restaurant.model.js**  
  โครงสร้าง table ร้านอาหาร (id, name, type, imageUrl)

- **role.model.js**  
  โครงสร้าง table role (id, name)

- **user.model.js**  
  โครงสร้าง table user (username, name, password, email)

---

### routers/

- **auth.router.js**  
  กำหนด path `/api/v1/register/signup` และ `/api/v1/register/signin`  
  เชื่อมกับ `authController`

- **restaurant.router.js**  
  กำหนด path CRUD สำหรับร้านอาหาร  
  เชื่อมกับ `restaurantController`

---

## Flow การทำงาน

1. เริ่มที่ `index.js`
   - โหลด env
   - เชื่อมต่อ DB
   - sync schema
   - กำหนด router
   - เริ่มฟัง port

2. ทุก request จะถูกส่งไปยัง router -> controller -> model

---

## หมายเหตุ

- ถ้าใช้ Docker ให้ตรวจสอบว่า database container พร้อมก่อน
- ขั้นตอนการเริ่มต้นโปรเจ็กต์ Restaurant API Server

## 1. เตรียมไฟล์ .env
- สร้างไฟล์ `.env` ที่โฟลเดอร์ `server/`
- กำหนดค่าตัวแปรเช่น
  ```
  PORT=3000
  HOST=localhost
  USER=your_db_user
  PASSWORD=your_db_password
  DB=your_db_name
  DBPORT=5432
  DIALECT=postgres
  JWT_SECRET=yourSecretKey
  ```

## 2. ติดตั้ง dependencies
- เปิด terminal ที่โฟลเดอร์ `server/`
- รันคำสั่ง
  ```
  npm install
  ```

## 3. ตรวจสอบ/แก้ไข Docker (ถ้าใช้)
- ตรวจสอบไฟล์ `Dockerfile.server` ว่าถูกต้อง
- สร้าง image และรัน container ด้วย
  ```
  docker build -t restaurant-server -f Dockerfile.server .
  docker run -p 3000:3000 restaurant-server
  ```

## 4. รันเซิร์ฟเวอร์ (กรณีไม่ใช้ Docker)
- เปิด terminal ที่โฟลเดอร์ `server/`
- รันคำสั่ง
  ```
  node index.js
  ```

## 5. ทดสอบ API
- ใช้ Postman หรือ curl ทดสอบ endpoint เช่น
  - POST `/api/v1/register/signup`
  - POST `/api/v1/register/signin`
  - GET `/api/v1/restaurant`
  - POST `/api/v1/restaurant`

---

