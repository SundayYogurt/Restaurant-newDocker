const {DataTypes} = require("sequelize")
const sequelize = require("./db.js")
const User = sequelize.define("user", {
    username:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})//create schema หรือโครงสร้างของข้อมูล

User.sync({force: true}).then(()=>{
    console.log("Table created or already exists")
}).catch((error)=>{
    console.log("Error creating table", error);
})

module.exports = User