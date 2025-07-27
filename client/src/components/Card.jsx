import React from "react";

const Card = (props) => {

  const deleted = async (id) => {
    //เริ่มการรอ
     const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
     if (!confirmDelete) return; // ถ้าไม่ยืนยัน ก็ไม่ทำอะไร

    try {
      const response = await fetch("http://localhost:3000/api/v1/restaurant/"+ id, {
        // รอ
        method: "DELETE"
      });
      if (response.ok) {
        alert("Restaurant Deleted successfully");
        window.location.reload(); // Reload the page to see the changes
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          className=" max-w-2xl max-h-56 w-full object-cover"
          src={props.imageUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.type}</p>
        <div className="card-actions justify-end">
          <a href={`/update/${props.id}`}><button className="btn btn-primary">Edit</button></a>
          <button onClick={() => deleted(props.id)} className="btn btn-secondary">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
