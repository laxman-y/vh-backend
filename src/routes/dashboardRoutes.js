const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getDashboardStats,

  getRecentSales,

  getRecentPurchases

} = require("../controllers/dashboardController");

router.get(
  "/",
  protect,
  getDashboardStats
);

router.get(
  "/recent-sales",
  protect,
  getRecentSales
);

router.get(
  "/recent-purchases",
  protect,
  getRecentPurchases
);

module.exports = router;