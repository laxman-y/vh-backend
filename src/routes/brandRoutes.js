const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} = require("../controllers/brandController");

router.post("/", protect, createBrand);

router.get("/", getBrands);

router.get("/:id", getBrandById);

router.put("/:id", protect, updateBrand);

router.delete("/:id", protect, deleteBrand);

module.exports = router;