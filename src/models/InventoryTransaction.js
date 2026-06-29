const mongoose = require("mongoose");

const inventoryTransactionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      default: null
    },

    transactionType: {
      type: String,
      enum: [
        "PURCHASE",
        "SALE",
        "CUSTOMER_RETURN",
        "SUPPLIER_RETURN",
        "REPLACEMENT_OUT",
        "REPLACEMENT_IN",
        "MANUAL_ADJUSTMENT",
        "OPENING_STOCK"
      ],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    stockBefore: {
      type: Number,
      required: true
    },

    stockAfter: {
      type: Number,
      required: true
    },

    remarks: {
      type: String,
      default: ""
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);