const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json())//แปลง text เป็น json
app.use(express.urlencoded({ extended: true})) //ให้ express มองเป็น json

app.get('/', (req, res) => { // ('/') คือ path
  res.send('Restful API')
})

app.listen(PORT,() => {
  console.log("Listening to http://localhost:" + PORT)
});