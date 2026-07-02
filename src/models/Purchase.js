const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    purchasePrice: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now
    },

    invoiceNumber: {
      type: String,
      default: ""
    },

    remarks: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Purchase",
  purchaseSchema
);
