import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import RestaurantService from "../services/restaurant.service";
const Update = () => {

  // 1. ดึง id จาก url ด้วย useParams
  const { id } = useParams();

  // สร้าง state สำหรับเก็บข้อมูลร้านอาหารที่จะแก้ไข
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });

  // 2. ดึงข้อมูลร้านอาหารจาก API ตาม id เมื่อ id เปลี่ยน
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await RestaurantService.getRestaurantById(id);
        if (response.status === 200) {
          setRestaurant(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get restaurant failed",
          icon: "error",
          text: error?.response?.data?.message || error.message
        });
      }
    };
    getRestaurant();
  }, [id]);



  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await RestaurantService.editRestaurantById(id, restaurant);

    if (response.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Restaurant updated successfully",
        icon: "success",
        timer: 2000,
        allowOutsideClick: false,
        showConfirmButton: false,
      })
      setRestaurant({
        name: "",
        type: "",
        imageUrl: "",
      })
       setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log(response.data)
    }
  } catch (error) {
    Swal.fire({
      title: "Update Failed",
      text: error?.response?.data?.message || error.message,
      icon: "error",
    });
  }
};


  return (
    <div className="container mx-auto pb-7">


      <form className="max-w-sm mx-auto mt-10 rounded-2xl shadow-xl ">
        <div className="text-center items-center space-y-8 m-10 p-10  ">
          <ul className="text-center items-center space-y-8">
            <li>
              {/* หัวข้อฟอร์ม */}
              <label className="text-4xl">Update form</label>
            </li>
            <li>
              {/* ช่องกรอกชื่อร้าน */}
              <label>Title</label>
              <br />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
                value={restaurant.name}
              ></input>
            </li>
            <li>
              {/* ช่องกรอกประเภทอาหาร */}
              <label>Type</label>
              <br />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="type"
                placeholder="Type"
                onChange={handleChange}
                value={restaurant.type}
              ></input>
            </li>
            <li>
              {/* ช่องกรอกลิงก์รูปภาพ */}
              <label>Upload Image</label>
              <br />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="imageUrl"
                placeholder="Image"
                onChange={handleChange}
                value={restaurant.imageUrl}
              ></input>
              {/* แสดง preview รูปภาพถ้ามี */}
              {restaurant && (
                <div className="flex items-center gap-3 m-5 ">
                  {restaurant.imageUrl && (
                    <img
                      className="rounded-2xl"
                      src={restaurant.imageUrl}
                      alt="preview"
                    ></img>
                  )}
                </div>
              )}
            </li>
          </ul>
          <div className="m-5 space-x-3.5">
            {/* ปุ่ม update */}
            <button type="submit" className="btn btn-soft btn-primary" onClick={handleSubmit}>
              update
            </button>
            {/* ปุ่ม Cancel (ยังไม่ทำงาน) */}
            <button className="btn btn-soft btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
