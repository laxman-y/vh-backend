const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  createCustomer,

  getCustomers,

  getCustomerById,

  updateCustomer,

  deleteCustomer

} = require("../controllers/customerController");

// Create Customer
router.post(
  "/",
  protect,
  createCustomer
);

// Get All Customers
router.get(
  "/",
  protect,
  getCustomers
);

// Get Customer By ID
router.get(
  "/:id",
  protect,
  getCustomerById
);

// Update Customer
router.put(
  "/:id",
  protect,
  updateCustomer
);

// Delete Customer
router.delete(
  "/:id",
  protect,
  deleteCustomer
);

module.exports = router;