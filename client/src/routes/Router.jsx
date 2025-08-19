// นำเข้า createBrowserRouter สำหรับสร้าง router
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import AddRes from "../pages/AddRes";
import Update from "../pages/Update";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp"
import AdminPage from "../pages/AdminPage";
import NotAllowed from "../pages/NotAllowed";
import AdminUserAndModerator from "../pages/AdminUserAndModerator"
import Profile from "../pages/Profile";
import AdminAndModeratorPage from "../pages/AdminAndModeratorPage";
import EditProfile from "../pages/EditProfile";
// กำหนดเส้นทางแต่ละหน้า
const router = createBrowserRouter([
  {
    path: "/", // หน้าแรก
    element: <Home />
  },
  {
    path: "/add", // หน้าเพิ่มร้าน
    element:
      <AdminPage>
        <AddRes />
      </AdminPage>
  },
  {
    path: "/update/:id", // หน้าแก้ไขร้าน
    element:
      <AdminAndModeratorPage>
        <Update />
      </AdminAndModeratorPage>
  },
  {
    path: "/signin", // login
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/notallowed",
    element: <NotAllowed />
  },
  {
    
  path: "/profile",
  element: 
  < AdminUserAndModerator >
  <Profile />
  </AdminUserAndModerator>
  },
{
  path: "/edit-profile",
    element: <EditProfile />
}


])

export default router