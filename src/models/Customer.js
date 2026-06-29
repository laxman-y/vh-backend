const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      default: "",
      trim: true
    },

    gstNumber: {
      type: String,
      default: "",
      trim: true
    },

    address: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    state: {
      type: String,
      default: ""
    },

    pincode: {
      type: String,
      default: ""
    },

    openingBalance: {
      type: Number,
      default: 0
    },

    creditLimit: {
      type: Number,
      default: 0
    },

    notes: {
      type: String,
      default: ""
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Customer",
  customerSchema
);