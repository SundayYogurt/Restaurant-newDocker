// นำเข้า StrictMode เพื่อช่วยตรวจสอบปัญหาใน React
import { StrictMode } from "react";
// นำเข้า createRoot สำหรับ React 18+
import { createRoot } from "react-dom/client";
// นำเข้าไฟล์ CSS หลัก (Tailwind + DaisyUI)
import "./index.css";
// นำเข้า router ที่กำหนดเส้นทางแต่ละหน้า
import router from "./routes/Router.jsx";
// นำเข้า RouterProvider สำหรับจัดการ routing
import { RouterProvider } from "react-router";
// นำเข้า Navbar component
import Navbar from "./components/Navbar.jsx"

// สร้าง root และ render แอป
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Navbar จะแสดงทุกหน้า */}
    <Navbar />
    {/* RouterProvider ใช้สำหรับจัดการเส้นทาง (route) */}
    <RouterProvider router={router}/>
  </StrictMode>
);