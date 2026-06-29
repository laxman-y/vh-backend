const Invoice = require("../models/Invoice");
const { createInvoice } = require("../services/invoiceService");

// ==========================
// CREATE INVOICE
// ==========================

const createInvoiceController = async (req, res) => {

    try {

        const invoice = await createInvoice(req.body);

        res.status(201).json({
            success: true,
            message: "Invoice created successfully.",
            invoice
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// GET ALL INVOICES
// ==========================

const getInvoices = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const keyword = req.query.keyword
            ? {
                  invoiceNumber: {
                      $regex: req.query.keyword,
                      $options: "i"
                  }
              }
            : {};

        const total = await Invoice.countDocuments(keyword);

        const invoices = await Invoice.find(keyword)

            .populate("customer")

            .populate("items.product")

            .sort({ createdAt: -1 })

            .skip((page - 1) * limit)

            .limit(limit);

        res.json({

            success: true,

            total,

            page,

            pages: Math.ceil(total / limit),

            invoices

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// GET SINGLE INVOICE
// ==========================

const getInvoiceById = async (req, res) => {

    try {

        const invoice = await Invoice.findById(req.params.id)

            .populate("customer")

            .populate("items.product");

        if (!invoice) {

            return res.status(404).json({

                success: false,

                message: "Invoice not found."

            });

        }

        res.json({

            success: true,

            invoice

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createInvoiceController,

    getInvoices,

    getInvoiceById

};