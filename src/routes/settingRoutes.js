const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getSettings,

  createSettings,

  updateSettings,

  resetSettings

} = require("../controllers/settingController");

// ======================================
// GET SETTINGS
// ======================================

router.get(
  "/",
  protect,
  getSettings
);

// ======================================
// CREATE SETTINGS
// ======================================

router.post(
  "/",
  protect,
  createSettings
);

// ======================================
// UPDATE SETTINGS
// ======================================

router.put(
  "/",
  protect,
  updateSettings
);

// ======================================
// RESET SETTINGS
// ======================================

router.delete(
  "/reset",
  protect,
  resetSettings
);

module.exports = router;