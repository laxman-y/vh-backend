const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  createPayment,

  getPayments,

  getPaymentById,

  deletePayment,

  getPaymentSummary

} = require("../controllers/paymentController");

// ==============================
// Create Payment
// ==============================

router.post(
  "/",
  protect,
  createPayment
);

// ==============================
// Get All Payments
// ==============================

router.get(
  "/",
  protect,
  getPayments
);


router.get(
  "/summary/:saleId",
  protect,
  getPaymentSummary
);

// ==============================
// Get Single Payment
// ==============================

router.get(
  "/:id",
  protect,
  getPaymentById
);

// ==============================
// Delete Payment
// ==============================

router.delete(
  "/:id",
  protect,
  deletePayment
);

module.exports = router;