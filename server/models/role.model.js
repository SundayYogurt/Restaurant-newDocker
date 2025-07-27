const {DataTypes} = require("sequelize") // import DataTypes
const sequelize = require("./db.js")     // import instance ของ Sequelize

// สร้าง model role และกำหนด schema
const Role = sequelize.define("role",{
    id:{
        type: DataTypes.INTEGER,     // กำหนดชนิดข้อมูลเป็น integer
        primaryKey: true,            // กำหนดเป็น primary key
        autoIncrement: true,         // เพิ่มค่าอัตโนมัติ
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Role // ส่งออก model role