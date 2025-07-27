# Restaurant-newDocker

โปรเจคนี้เป็นระบบจัดการร้านอาหารแบบ RESTful API และเว็บแอป โดยใช้ Node.js (Express + Sequelize) สำหรับฝั่งเซิร์ฟเวอร์ และ React + Vite + TailwindCSS สำหรับฝั่งไคลเอนต์ พร้อมรองรับการใช้งานผ่าน Docker

---

## โครงสร้างโปรเจค

```
Restaurant-newDocker/
│
├── client/         # ฝั่งเว็บแอป (React)
│   ├── src/        # โค้ดหลักของ React
│   ├── public/     # ไฟล์ static
│   ├── package.json
│   ├── Dockerfile.client
│   └── README.md
│
└── server/         # ฝั่ง API (Node.js/Express)
    ├── config/     # การตั้งค่า JWT และฐานข้อมูล
    ├── controllers/# ฟังก์ชันจัดการข้อมูล
    ├── models/     # โครงสร้างข้อมูล Sequelize
    ├── routers/    # เส้นทาง API
    ├── .env        # ตัวแปร environment
    ├── Dockerfile.server
    ├── index.js    # จุดเริ่มต้นเซิร์ฟเวอร์
    ├── package.json
    └── README.md
```

---

## การทำงานโดยรวม

- **ฝั่ง server**  
  - สร้าง RESTful API สำหรับร้านอาหารและผู้ใช้
  - ใช้ Sequelize เชื่อมต่อฐานข้อมูล (Postgres/MySQL)
  - รองรับ JWT Authentication
  - โครงสร้างแบบ MVC (Model-View-Controller)
  - สามารถรันผ่าน Docker ได้

- **ฝั่ง client**  
  - สร้างเว็บแอปด้วย React + Vite
  - ใช้ TailwindCSS และ DaisyUI สำหรับ UI
  - ดึงข้อมูลร้านอาหารจาก API
  - มีฟอร์มเพิ่ม/แก้ไข/ลบร้านอาหาร
  - มีระบบสมัครสมาชิก/เข้าสู่ระบบ

---

## วิธีเริ่มต้นใช้งาน

### 1. เตรียมไฟล์ .env ใน server

```env
PORT=3000
HOST=localhost
USER=your_db_user
PASSWORD=your_db_password
DB=your_db_name
DBPORT=5432
DIALECT=postgres
JWT_SECRET=yourSecretKey
```

### 2. ติดตั้ง dependencies

```sh
cd server
npm install

cd ../client
npm install
```

### 3. รันเซิร์ฟเวอร์

- แบบปกติ:
  ```sh
  cd server
  node index.js
  ```
- หรือรันผ่าน Docker:
  ```sh
  docker build -t restaurant-server -f Dockerfile.server .
  docker run -p 3000:3000 restaurant-server
  ```

### 4. รันเว็บแอป

```sh
cd client
npm run dev
```
หรือใช้ Docker:
```sh
docker build -t restaurant-client -f Dockerfile.client .
docker run -p 5173:5173 restaurant-client
```

---

## API Endpoint หลัก

- ร้านอาหาร:  
  - `GET /api/v1/restaurant` (ดูทั้งหมด)
  - `POST /api/v1/restaurant` (เพิ่ม)
  - `GET /api/v1/restaurant/:id` (ดูรายร้าน)
  - `PUT /api/v1/restaurant/:id` (แก้ไข)
  - `DELETE /api/v1/restaurant/:id` (ลบ)

- ผู้ใช้:  
  - `POST /api/v1/register/signup` (สมัครสมาชิก)
  - `POST /api/v1/register/signin` (เข้าสู่ระบบ)

---

## หมายเหตุ

- สามารถแก้ไข/ขยายฟีเจอร์ได้ตามต้องการ
- เหมาะสำหรับผู้เริ่มต้น Fullstack, DevOps, หรือผู้ต้องการศึกษาการใช้งาน