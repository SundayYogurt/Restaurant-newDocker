import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  // ดึงค่าข้อมูลจาก user
  const name = user?.userInfo?.name || "No Name";
  const email = user?.userInfo?.email || "No Email";

  // หาว่า role คืออะไร
  let role = "USER"; // ค่า default
  if (user?.authorities?.includes("ROLES_ADMIN")) {
    role = "ADMIN";
  } else if (user?.authorities?.includes("ROLES_MODERATOR")) {
    role = "MODERATOR";
  }

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "คุณต้องการออกจากระบบ?",
      text: "กดปุ่มยืนยันเพื่อออกจากระบบ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // มาจาก context
        navigate("/signin");
        Swal.fire("ออกจากระบบแล้ว", "", "success");
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-96 text-center">
        <img
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          src={`https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`}
          alt="profile"
        />
        <h2 className="text-gray-600 text-2xl font-bold mt-4">{name}</h2>
        <p className="text-gray-600">{email}</p>
        <span
          className={`inline-block mt-3 px-3 py-1 text-sm font-semibold rounded-full ${
            role === "ADMIN"
              ? "bg-red-100 text-red-600"
              : role === "MODERATOR"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {role}
        </span>

        {/* ปุ่ม Action ด้วย DaisyUI */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handleEdit} className="btn btn-primary">
            แก้ไขโปรไฟล์
          </button>
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
