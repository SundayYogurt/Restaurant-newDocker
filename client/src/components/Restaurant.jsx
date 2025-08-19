import React, { useEffect } from "react";
import Card from "./Card";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2"; // 
import { useNavigate } from "react-router";

const Restaurant = ({ restaurants }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      let timerInterval;
      Swal.fire({
        title: "you don't have permission to this page please login or register!",
        html: "I will close in <b></b> milliseconds.",
        timer: 5000,
        timerProgressBar: true,
        allowOutsideClick: false,  
        allowEscapeKey: false,     
        allowEnterKey: false,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
          navigate("/signin")
        }
      });
    }
  }, [user]);

  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {/* แสดงการ์ดถ้ามี user */}
        {restaurants && user &&
          restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              type={restaurant.type}
              imageUrl={restaurant.imageUrl}
            />
          ))}

        {/* ถ้าไม่มีร้าน */}
        {!restaurants && <div>no content.</div>}
      </div>
    </div>
  );
};

export default Restaurant;
