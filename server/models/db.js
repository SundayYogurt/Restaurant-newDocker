const { Sequelize } = require("sequelize")
const dbConfig = require("../config/db.config.js")

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    port: dbConfig.DBPORT,
    dialect: dbConfig.DIALECT,
    logging: false,
});

const testConnection = async () => {
    try{
        await sequelize.authenticate()
        console.log("Connection successfully")
    }catch{
        console.log("Unable connect to the database", console.error());
    }
}

testConnection();
module.exports = sequelize