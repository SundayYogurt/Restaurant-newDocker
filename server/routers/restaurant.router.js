const restaurantController = require("../controllers/restaurant.controller") // import controller สำหรับ restaurant

const express = require("express") // import express
const router = express.Router();   // สร้าง router object

// POST เพิ่มร้านอาหารใหม่
router.post("/",restaurantController.create);

// GET ดึงข้อมูลร้านอาหารทั้งหมด
router.get("/",restaurantController.getAll);

// GET ดึงข้อมูลร้านอาหารตาม id
router.get("/:id",restaurantController.getById);

// PUT แก้ไขข้อมูลร้านอาหารตาม id
router.put("/:id",restaurantController.updateById);

// DELETE ลบร้านอาหารตาม id
router.delete("/:id",restaurantController.deleteById);

module.exports = router // ส่งออก router