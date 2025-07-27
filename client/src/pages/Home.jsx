import React, { useState, useEffect } from "react";
import Restaurant from "../components/Restaurant";

// คอมโพเนนต์ Home สำหรับแสดงร้านอาหารและค้นหา
const Home = () => {
  // state สำหรับเก็บร้านอาหารที่ผ่านการกรอง (filter)
  const [filterRestaurant, setFilterRestaurant] = useState([]);

  // ฟังก์ชัน handleSearch สำหรับค้นหาร้านอาหารตาม keyword
  const handleSearch = (keyword) => {
    if( keyword === ""){
      setFilterRestaurant(restaurants)
      return
    }
    // กรองร้านอาหารที่ name หรือ type ตรงกับ keyword
    const result = restaurants.filter((restaurant)=>{
      return (
        restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
        restaurant.type.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    })
    setFilterRestaurant(result)
  }

  // state สำหรับเก็บร้านอาหารทั้งหมด
  const [restaurants, setRestaurants] = useState([]);

  // ดึงข้อมูลร้านอาหารจาก API เมื่อ component mount
  useEffect(() => {
    
    fetch("http://localhost:3000/api/v1/restaurant") // เปลี่ยน port ให้ตรงกับ API ที่รันอยู่จริง
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setRestaurants(resp);
        setFilterRestaurant(resp)
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  // ส่วนของการแสดงผล UI
  return (
    <>
      <div className="container mx-auto pb-7">
        {/* Header */}
        <div>
          <h1 className="title justify-center text-3xl text-center m-5 p-5">
            Grab Restaurant
          </h1>
        </div>
        {/* Search */}
        <div className="mb-5 flex justify-center items-center">
          <label className="input flex items-center gap-3 w-2xl">
            {/* ไอคอนแว่นขยาย */}
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            {/* ช่อง input สำหรับค้นหา */}
            <input onChange={(e) => handleSearch(e.target.value)} name="keyword" type="search" required placeholder="Search" />
          </label>
        </div>
      </div>
      {/* แสดงรายชื่อร้านอาหาร */}
      <Restaurant restaurants={filterRestaurant} />
    </>
  );
};

export default Home;
