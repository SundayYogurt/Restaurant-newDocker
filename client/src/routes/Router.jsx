// นำเข้า createBrowserRouter สำหรับสร้าง router
import { createBrowserRouter } from "react-router";
// นำเข้าแต่ละหน้า
import AddRes from "../pages/AddRes";
import Home from "../Pages/Home";
import Update from "../pages/Update";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp"

// กำหนดเส้นทางแต่ละหน้า
const router = createBrowserRouter([
  {
    path:"/", // หน้าแรก
    element:<Home/>
  },
  {
    path:"/add", // หน้าเพิ่มร้าน
    element:<AddRes/>
  },
  {
    path:"/update/:id", // หน้าแก้ไขร้าน
    element:<Update/>
  },
  {
    path:"/signin", // login
    element:<SignIn/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  }

])

export default router