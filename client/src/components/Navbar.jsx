import React from "react";

// Navbar component สำหรับแสดงเมนูนำทาง
const Navbar = () => {
  // รายการเมนู
  const menuItems = [
    { name: "Add Restaurant", url: "/add" },
    { name: "Update", url: "/update/:id" },
    { name: "About Us", url: "/update" }
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar ซ้าย (โลโก้ + dropdown) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* ไอคอน hamburger สำหรับ mobile */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {/* เมนู dropdown (mobile) */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item, i) => (
              <li key={i}>
                <a href={item.url}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* โลโก้ */}
        <a href="/" className="btn btn-ghost text-xl">
          Grab
        </a>
      </div>
      {/* Navbar กลาง (desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Navbar ขวา (ปุ่ม Register/Login) */}
      <div className="navbar-end space-x-2.5">
        <a href="/signup"><button className="btn btn-soft btn-primary">Register</button></a>
        <a href="/signin"><button className="btn btn-soft btn-accent">Login</button></a>
      </div>
    </div>
  );
};

export default Navbar;