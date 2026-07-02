const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(

  {

    product: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Product",

      required: true

    },

    customer: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Customer"

    },

    customerName: {

      type: String,

      required: true

    },

    quantity: {

      type: Number,

      required: true

    },

    sellingPrice: {

      type: Number,

      required: true

    },

    purchasePrice: {

      type: Number,

      required: true

    },

    discount: {

      type: Number,

      default: 0

    },

    gst: {

      type: Number,

      default: 0

    },

    subTotal: {

      type: Number,

      required: true

    },

    taxAmount: {

      type: Number,

      default: 0

    },

    totalAmount: {

      type: Number,

      required: true

    },

    profit: {

      type: Number,

      required: true

    },

    paymentMethod: {

      type: String,

      enum: ["Cash", "UPI", "Card", "Bank"],

      default: "Cash"

    },

    paymentStatus: {

      type: String,

      enum: ["Paid", "Pending"],

      default: "Paid"

    },

    invoiceNumber: {

      type: String,

      default: ""

    },

    saleDate: {
      type: Date,
      default: Date.now
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

  "Sale",

  saleSchema

);
