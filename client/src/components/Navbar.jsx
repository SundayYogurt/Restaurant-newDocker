import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";
// Navbar component สำหรับแสดงเมนูนำทาง
const Navbar = () => {

  const { user } = useAuthContext();
  // รายการเมนู
  const menuItems = [
    { name: "Add Restaurant", url: "/add" },
    { name: "Cart", url: "/cart" },
    { name: "Home", url: "/" }
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
            
            {(user?.authorities.includes("ROLES_ADMIN")) && menuItems.map((item, i) => (
              <li key={i}>
                <a href={item.url}>{item.name}</a>
              </li>
            ))}
            {(user?.authorities.includes("ROLES_MODERATOR")) && (
            <li >
              <a href ={menuItems[1].url}>{menuItems[1].name}</a>
            </li>
          )}

          {(user?.authorities.includes("ROLES_USER")) && (
            <li >
               <a href ={menuItems[2].url}>{menuItems[2].name}</a>
            </li>
          )}
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
          {(user?.authorities.includes("ROLES_ADMIN")) && menuItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}

          {(user?.authorities.includes("ROLES_MODERATOR")) && (
            <li >
              <a href ={menuItems[1].url}>{menuItems[1].name}</a>
            </li>
          )}

          {(user?.authorities.includes("ROLES_USER")) && (
            <li >
               <a href ={menuItems[2].url}>{menuItems[2].name}</a>
            </li>
          )}
        </ul>
      </div>
      {/* Navbar ขวา (ปุ่ม Register/Login) */}
      <div className="navbar-end space-x-2.5">

        {user ? (<UserProfile />) :
          (<div className="flex gap-5"><a href="/signup"><button className="btn btn-soft btn-primary">Register</button></a>
            <a href="/signin"><button className="btn btn-soft btn-accent">Login</button></a></div>)}


      </div>
    </div >
  );
};

export default Navbar;