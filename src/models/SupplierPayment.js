const mongoose = require("mongoose");

const supplierPaymentSchema = new mongoose.Schema(
{
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  },

  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
    required: true
  },

  invoiceNumber: {
    type: String,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  paidAmount: {
    type: Number,
    required: true
  },

  dueAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: [
      "Cash",
      "UPI",
      "Card",
      "Bank Transfer",
      "Cheque"
    ],
    default: "Cash"
  },

  paymentDate: {
    type: Date,
    default: Date.now
  },

  remarks: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: [
      "Paid",
      "Partial",
      "Due"
    ],
    default: "Due"
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "SupplierPayment",
  supplierPaymentSchema
);