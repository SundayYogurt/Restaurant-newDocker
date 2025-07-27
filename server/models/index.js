const sequelize = require("./db");      // import instance ของ Sequelize
const Sequelize = require("sequelize"); // import Sequelize ORM

const User = require("./user.model")    // import model user
const Role = require("./role.model")    // import model role

const db = {};
db.sequelize = sequelize                // เก็บ instance ของ Sequelize
db.Sequelize = Sequelize                // เก็บ Sequelize ORM

db.User = User;                         // เก็บ model user
db.Role = Role;                         // เก็บ model role

// กำหนดความสัมพันธ์ระหว่าง role กับ user (many-to-many)
db.Role.belongsToMany(db.User, {
    through:"user_roles"                // ใช้ table กลางชื่อ user_roles
})

// กำหนดความสัมพันธ์ระหว่าง user กับ role (many-to-many)
db.User.belongsToMany(db.Role, {
    through:"user_roles"
})

module.exports = db;                    // ส่งออก db object สำหรับใช้ใน controller