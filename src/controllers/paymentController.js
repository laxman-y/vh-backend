const Payment = require("../models/Payment");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");

// ======================================
// Create Payment
// ======================================

const createPayment = async (req, res) => {

  try {

    const {
      customer,
      sale,
      paidAmount,
      paymentMethod,
      remarks
    } = req.body;

    const saleData =
      await Sale.findById(sale);

    if (!saleData) {

      return res.status(404).json({
        success: false,
        message: "Sale not found"
      });

    }

    let totalAmount =
      saleData.totalAmount;

    let dueAmount =
      totalAmount - Number(paidAmount);

    if (dueAmount < 0) {

      return res.status(400).json({

        success: false,

        message:
          "Paid amount cannot exceed invoice amount"

      });

    }

    let status = "Due";

    if (dueAmount === 0) {

      status = "Paid";

    } else if (
      paidAmount > 0
    ) {

      status = "Partial";

    }

    const payment =
      await Payment.create({

        customer,

        sale,

        invoiceNumber:
          saleData.invoiceNumber,

        totalAmount,

        paidAmount,

        dueAmount,

        paymentMethod,

        remarks,

        status

      });

    res.status(201).json({

      success: true,

      payment

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// Get Payments
// ======================================

const getPayments =
  async (req, res) => {

    try {

      const payments =
        await Payment.find()

        .populate(
          "customer",
          "name phone"
        )

        .populate(
          "sale",
          "invoiceNumber totalAmount"
        )

        .sort({
          createdAt: -1
        });

      res.json({

        success: true,

        totalPayments:
          payments.length,

        payments

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

};

// ======================================
// Get Single Payment
// ======================================

const getPaymentById =
  async (req, res) => {

    try {

      const payment =
        await Payment.findById(
          req.params.id
        )

        .populate("customer")

        .populate("sale");

      if (!payment) {

        return res.status(404).json({

          success: false,

          message:
            "Payment not found"

        });

      }

      res.json({

        success: true,

        payment

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

};

// ======================================
// Delete Payment
// ======================================

const deletePayment =
  async (req, res) => {

    try {

      const payment =
        await Payment.findByIdAndDelete(
          req.params.id
        );

      if (!payment) {

        return res.status(404).json({

          success: false,

          message:
            "Payment not found"

        });

      }

      res.json({

        success: true,

        message:
          "Payment deleted successfully"

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

};

// ======================================
// Get Payment Summary by Sale
// ======================================

const getPaymentSummary = async (req, res) => {

  try {

    const saleId = req.params.saleId;

    const sale = await Sale.findById(saleId);

    if (!sale) {

      return res.status(404).json({
        success: false,
        message: "Sale not found"
      });

    }

    const payments = await Payment.find({
      sale: saleId
    });

    const totalPaid =
      payments.reduce(
        (sum, item) =>
          sum + item.paidAmount,
        0
      );

    const remaining =
      sale.totalAmount - totalPaid;

    res.json({

      success: true,

      invoiceTotal:
        sale.totalAmount,

      totalPaid,

      remaining,

      status:
        remaining <= 0
          ? "Paid"
          : totalPaid === 0
          ? "Due"
          : "Partial"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  createPayment,
  getPaymentSummary,

  getPayments,

  getPaymentById,

  deletePayment

};