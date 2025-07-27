const { Sequelize } = require("sequelize") // import Sequelize ORM
const dbConfig = require("../config/db.config.js") // import config สำหรับฐานข้อมูล

// สร้าง instance ของ Sequelize สำหรับเชื่อมต่อฐานข้อมูล
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,           // host ของฐานข้อมูล
    port: dbConfig.DBPORT,         // port ของฐานข้อมูล
    dialect: dbConfig.DIALECT,     // dialect ของฐานข้อมูล
    logging: false,                // ปิด log query
});

// ฟังก์ชันทดสอบการเชื่อมต่อฐานข้อมูล
const testConnection = async () => {
    try{
        await sequelize.authenticate() // ทดสอบเชื่อมต่อ
        console.log("Connection successfully") // ถ้าสำเร็จ
    }catch{
        console.log("Unable connect to the database", console.error()); // ถ้าไม่สำเร็จ
    }
}

testConnection(); // เรียกฟังก์ชันทดสอบการเชื่อมต่อ
module.exports = sequelize // ส่งออก instance สำหรับใช้ใน model อื่น