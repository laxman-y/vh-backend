const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createInvoiceController,

    getInvoices,

    getInvoiceById

} = require("../controllers/invoiceV2Controller");

router.post("/", createInvoiceController);

router.get("/", protect, getInvoices);

router.get("/:id", protect, getInvoiceById);

module.exports = router;