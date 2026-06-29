const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getInvoice

} = require("../controllers/invoiceController");

router.get(

  "/:saleId",

  protect,

  getInvoice

);

module.exports = router;