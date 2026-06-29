const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getDashboardReport,

  getSalesReport,

  getPurchaseReport,

  getExpenseReport,

  getInventoryReport,

  getProfitLossReport

} = require("../controllers/reportController");

// ======================================
// Dashboard Summary
// ======================================

router.get(
  "/dashboard",
  protect,
  getDashboardReport
);

// ======================================
// Sales Report
// ======================================

router.get(
  "/sales",
  protect,
  getSalesReport
);

// ======================================
// Purchase Report
// ======================================

router.get(
  "/purchases",
  protect,
  getPurchaseReport
);

// ======================================
// Expense Report
// ======================================

router.get(
  "/expenses",
  protect,
  getExpenseReport
);

// ======================================
// Inventory Report
// ======================================

router.get(
  "/inventory",
  protect,
  getInventoryReport
);

// ======================================
// Profit & Loss Report
// ======================================

router.get(
  "/profit-loss",
  protect,
  getProfitLossReport
);

module.exports = router;