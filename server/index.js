const express = require('express')
const dotenv  = require('dotenv')
const app = express()
dotenv.config();
const PORT = process.env.PORT || 3000;
const restaurantRouter = require("./routers/restaurant.router")
const authRouter = require("./routers/auth.router")
const db = require("./models/index")
const role = db.Role

const initRole = () => {
  role.create({id:1, name:"user"})
  role.create({id:2, name:"moderator"})
  role.create({id:3, name:"admin"})
}

db.sequelize.sync({force: true}).then(()=>{
   initRole();
   console.log("Drop and Sync")
})

app.use(express.json())//แปลง text เป็น json
app.use(express.urlencoded({ extended: true})) //ให้ express มองเป็น json

app.use('/api/v1/restaurant' ,restaurantRouter); // เรียกใช้ router
app.use('/api/v1/register', authRouter)
app.get('/', (req, res) => { // ('/') คือ path
  res.send('Restful API')
})

app.listen(PORT,() => {
  console.log("Listening to http://localhost:" + PORT)
});