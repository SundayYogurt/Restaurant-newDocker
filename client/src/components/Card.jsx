import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import RestaurantService from "../services/restaurant.service";

const Card = (props) => {
  const { user } = useAuthContext();

  const deleted = async (id) => {
    const swalWithDaisyButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary", // ปุ่ม confirm ของ DaisyUI
        cancelButton: "btn btn-secondary", // ปุ่ม cancel ของ DaisyUI
      },
      buttonsStyling: false, // ใช้ style ของ DaisyUI
    });

    const result = await swalWithDaisyButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await RestaurantService.deleteRestaurant(id);
        if (response.status === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Restaurant has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          }).then(()=>{
            window.location.reload()
          })

        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || error.message,
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Restaurant is safe :)",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-secondary",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          className="max-w-2xl max-h-56 w-full object-cover"
          src={props.imageUrl}
          alt={props.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.type}</p>
        <div className="card-actions justify-end">
          {user?.authorities.includes("ROLES_USER") && (
            <button className="btn btn-secondary">Buy</button>
          )}

          {user?.authorities.includes("ROLES_ADMIN") && (
            <>
              <a href={`/update/${props.id}`}>
                <button className="btn btn-primary">Edit</button>
              </a>
              <button
                onClick={() => deleted(props.id)}
                className="btn btn-secondary"
              >
                Delete
              </button>
            </>
          )}

          {user?.authorities.includes("ROLES_MODERATOR") && (
            <a href={`/update/${props.id}`}>
              <button className="btn btn-primary">Edit</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
