# Grab Restaurant (Vite + React + Tailwind + DaisyUI)

เว็บแอปสำหรับแสดงและเพิ่มร้านอาหาร สร้างด้วย React, Vite, TailwindCSS และ DaisyUI  
ข้อมูลร้านอาหารดึงจาก mock API (json-server)

---

## วิธีเริ่มโปรเจกต์

1. ติดตั้ง dependencies  
   ```
   npm install
   ```

2. รัน json-server (mock API)  
   ```
   npx json-server --watch src/db.json --port 3000
   ```
   - API จะอยู่ที่ `http://localhost:3000/restaurants`

3. รันโปรเจกต์ React  
   ```
   npm run dev
   ```

---

## โครงสร้างไฟล์

```
src/
│   db.json
│   index.css
│   main.jsx
│
├── components/
│     Card.jsx
│     Navbar.jsx
│     Restaurant.jsx
│
└── Pages/
      AddRes.jsx
      Home.jsx
```

---

## อธิบายการทำงานของแต่ละไฟล์ (ละเอียด)

### main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AddRes from "./Pages/AddRes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AddRes />
  </StrictMode>
);
```
- **import { StrictMode } from "react";**  
  นำเข้า StrictMode จาก React เพื่อช่วยตรวจสอบปัญหาในคอมโพเนนต์ระหว่างพัฒนา เช่น การใช้ lifecycle methods ที่ deprecated หรือ side effect ที่ไม่เหมาะสม

- **import { createRoot } from "react-dom/client";**  
  ใช้สำหรับสร้าง root ของ React 18+ เพื่อ render แอปลงใน DOM

- **import "./index.css";**  
  นำเข้าไฟล์ CSS หลักที่ตั้งค่าด้วย TailwindCSS และ DaisyUI

- **import AddRes from "./Pages/AddRes.jsx";**  
  นำเข้าคอมโพเนนต์ AddRes ซึ่งเป็นหน้าฟอร์มสำหรับเพิ่มร้านอาหาร

- **createRoot(document.getElementById("root")).render(...)**  
  สร้าง root แล้ว render แอป (AddRes) ลงใน div ที่มี id="root" ใน index.html

- **<StrictMode>...</StrictMode>**  
  ครอบ AddRes เพื่อเปิด strict mode

---

### index.css

```css
@plugin "daisyui";
@import "tailwindcss";
```
- ใช้ TailwindCSS และ DaisyUI สำหรับ utility class และ component UI

---

### db.json

```json
{
  "restaurants": [
    {
      "id": "1",
      "title": "Raku Tea 楽茶",
      "type": "ชาไข่มุก",
      "img": "..."
    },
    ...
  ],
  "users": [
    {
      "username": "user1",
      "password": "123456",
      "id": "053f"
    }
  ]
}
```
- mock ข้อมูลร้านอาหารและผู้ใช้ ใช้กับ json-server เพื่อจำลอง API

---

### components/Navbar.jsx

- Navbar แสดงเมนูหลัก (Add Restaurant, Search, About Us) และปุ่ม Register/Login
- รองรับทั้ง mobile (dropdown) และ desktop (menu-horizontal)
- ใช้ TailwindCSS และ DaisyUI ในการจัด layout

---

### components/Card.jsx

- แสดงข้อมูลร้านอาหารแต่ละร้าน (ชื่อ, ประเภท, รูป)
- มีปุ่ม Edit, Delete (ยังไม่ทำงาน)
- รับ props: title, type, img

---

### components/Restaurant.jsx

- รับ props `restaurants` (array)
- วนลูปแสดง Card ของแต่ละร้านอาหาร
- ส่ง props ให้ Card แต่ละใบ

---

### Pages/Home.jsx

- ใช้ useState สร้าง state `restaurants` (array)
- ใช้ useEffect ดึงข้อมูลร้านอาหารจาก API (`http://localhost:3000/restaurants`) เมื่อ component mount
- ส่งข้อมูลร้านอาหารไปให้ Restaurant แสดงผล
- มีช่อง Search (ยังไม่ทำงาน)
- แสดง Navbar และหัวข้อ Grab Restaurant

---

### Pages/AddRes.jsx

- ฟอร์มเพิ่มร้านอาหารใหม่
- ใช้ useState เก็บข้อมูลร้านอาหารที่กรอก
- handleChange อัปเดต state เมื่อกรอกข้อมูล
- handleSumbit ส่งข้อมูลไป API (POST) เมื่อกด OK
- แสดงตัวอย่างรูปภาพที่กรอก URL

---

## การใช้ useState, useEffect และพารามิเตอร์

- **useState**  
  - ใช้สร้าง state ในฟังก์ชันคอมโพเนนต์
  - ตัวอย่าง:  
    `const [restaurants, setRestaurants] = useState([]);`
    - `restaurants` คือค่าปัจจุบัน
    - `setRestaurants` คือฟังก์ชันสำหรับเปลี่ยนค่า

- **useEffect**  
  - ใช้สำหรับรันโค้ดเมื่อ component ถูก mount หรือเมื่อ dependency เปลี่ยน
  - ตัวอย่าง:  
    ```js
    useEffect(() => {
      fetch("http://localhost:3000/restaurants")
        .then((res) => res.json())
        .then((resp) => setRestaurants(resp))
        .catch((e) => console.log(e.message));
    }, []);
    ```
    - รันครั้งเดียวตอน mount (เพราะ dependency array ว่าง)

- **handleChange**  
  - รับ event จาก input แล้วอัปเดต state ของฟอร์ม

- **handleSumbit**  
  - ส่งข้อมูลร้านอาหารใหม่ไปยัง API ด้วย fetch (POST)

---

## หมายเหตุ

- ข้อมูลร้านอาหารจะถูกโหลดแบบ dynamic จาก API (json-server)
- ถ้าต้องการเพิ่ม/แก้ไขข้อมูลร้านอาหาร ให้แก้ที่ `src/db.json` หรือใช้ฟอร์ม AddRes
- เหมาะกับการทดลองเล่นและฝึก React + Tailwind + DaisyUI

---