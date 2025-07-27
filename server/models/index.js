const sequelize = require("./db");
const Sequelize = require("sequelize");

const User = require("./user.model")
const Role = require("./role.model")

const db = {};
db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = User;
db.Role = Role;

db.Role.belongsToMany(db.User, {
    through:"user_roles"
})

db.User.belongsToMany(db.Role, {
    through:"user_roles"
})

module.exports = db;