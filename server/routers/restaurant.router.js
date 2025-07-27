const restaurantController = require("../controllers/restaurant.controller")

const express = require("express")
const router = express.Router();

//POST http://localhost:3000/api/v1/restaurant
router.post("/",restaurantController.create);

//GET http://localhost:3000/api/v1/restaurant
router.get("/",restaurantController.getAll);

//GET BY ID http://localhost:3000/api/v1/restaurant/:id
router.get("/:id",restaurantController.getById);

//GET BY ID http://localhost:3000/api/v1/restaurant/:id
router.put("/:id",restaurantController.updateById);

//DELETE BY ID http://localhost:3000/api/v1/restaurant/:id
router.delete("/:id",restaurantController.deleteById);

module.exports = router