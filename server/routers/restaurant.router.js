const restaurantController = require("../controllers/restaurant.controller");
const authMiddleware = require("../middleware/authJwt");
const express = require("express");
const router = express.Router();

// POST เพิ่มร้านอาหารใหม่ (admin หรือ moderator)
router.post(
  "/",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrMod],
  restaurantController.create
);

// GET ดึงข้อมูลร้านอาหารทั้งหมด (ทุกคนเข้าถึงได้)
router.get("/", restaurantController.getAll);

// GET ดึงข้อมูลร้านอาหารตาม id (ต้อง login)
router.get(
  "/:id",
  [authMiddleware.verifyToken],
  restaurantController.getById
);

// PUT แก้ไขข้อมูลร้านอาหารตาม id (admin หรือ moderator)
router.put(
  "/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrMod],
  restaurantController.updateById
);

// DELETE ลบร้านอาหารตาม id (admin เท่านั้น)
router.delete(
  "/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  restaurantController.deleteById
);

module.exports = router;
