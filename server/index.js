const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config();
const PORT = process.env.PORT || 3000;
const restaurantRouter = require("./routers/restaurant.router")

app.use(express.json())//แปลง text เป็น json
app.use(express.urlencoded({ extended: true})) //ให้ express มองเป็น json

app.use('/api/v1/restaurant', restaurantRouter)

app.get('/', (req, res) => { // ('/') คือ path
  res.send('Restful API')
})

app.listen(PORT,() => {
  console.log("Listening to http://localhost:" + PORT)
});