const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getMonthlySales,

  getMonthlyPurchases,

  getInventoryChart

} = require("../controllers/analyticsController");

router.get(
  "/monthly-sales",
  protect,
  getMonthlySales
);

router.get(
  "/monthly-purchases",
  protect,
  getMonthlyPurchases
);

router.get(
  "/inventory",
  protect,
  getInventoryChart
);

module.exports = router;