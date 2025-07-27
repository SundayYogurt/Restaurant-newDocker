const {DataTypes} = require("sequelize") // import DataTypes
const sequelize = require("./db.js")     // import instance ของ Sequelize

// สร้าง model restaurant และกำหนด schema
const Restaurant = sequelize.define("restaurant", {
    id:{
        type: DataTypes.INTEGER,     // กำหนดชนิดข้อมูลเป็น integer
        primaryKey: true,            // กำหนดเป็น primary key
        autoIncrement: true,         // เพิ่มค่าอัตโนมัติ
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})// สร้าง schema หรือโครงสร้างของข้อมูล

Restaurant.sync({force: false}).then(()=>{
    console.log("Table created or already exists") // log เมื่อสร้าง table สำเร็จ
}).catch((error)=>{
    console.log("Error creating table", error);    // log เมื่อเกิด error
})

module.exports = Restaurant // ส่งออก model restaurant