const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    // ==========================
    // BUSINESS INFORMATION
    // ==========================

    shopName: {
      type: String,
      default: "Vinayak Hardware Hub",
      trim: true
    },

    ownerName: {
      type: String,
      default: "",
      trim: true
    },

    gstNumber: {
      type: String,
      default: "",
      trim: true
    },

    phone: {
      type: String,
      default: "",
      trim: true
    },

    alternatePhone: {
      type: String,
      default: "",
      trim: true
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true
    },

    website: {
      type: String,
      default: "",
      trim: true
    },

    // ==========================
    // ADDRESS
    // ==========================

    address: {
      type: String,
      default: "",
      trim: true
    },

    city: {
      type: String,
      default: "",
      trim: true
    },

    state: {
      type: String,
      default: "",
      trim: true
    },

    country: {
      type: String,
      default: "India",
      trim: true
    },

    pincode: {
      type: String,
      default: "",
      trim: true
    },

    // ==========================
    // INVOICE SETTINGS
    // ==========================

    invoicePrefix: {
      type: String,
      default: "INV",
      trim: true
    },

    currency: {
      type: String,
      default: "₹"
    },

    defaultGST: {
      type: Number,
      default: 18
    },

    invoiceFooter: {
      type: String,
      default: "Thank you for your business."
    },

    termsAndConditions: {
      type: String,
      default:
        "Goods once sold will not be taken back."
    },

    // ==========================
    // BANK DETAILS
    // ==========================

    bankName: {
      type: String,
      default: ""
    },

    accountHolderName: {
      type: String,
      default: ""
    },

    accountNumber: {
      type: String,
      default: ""
    },

    ifscCode: {
      type: String,
      default: ""
    },

    branchName: {
      type: String,
      default: ""
    },

    upiId: {
      type: String,
      default: ""
    },

    // ==========================
    // BRANDING
    // ==========================

    logo: {
      type: String,
      default: ""
    },

    signature: {
      type: String,
      default: ""
    },

    favicon: {
      type: String,
      default: ""
    },

    // ==========================
    // EXTRA SETTINGS
    // ==========================

    timezone: {
      type: String,
      default: "Asia/Kolkata"
    },

    dateFormat: {
      type: String,
      default: "DD/MM/YYYY"
    },

    timeFormat: {
      type: String,
      default: "24 Hours"
    },

    language: {
      type: String,
      default: "English"
    },

    financialYearStart: {
      type: String,
      default: "01-04"
    },

    lowStockAlert: {
      type: Number,
      default: 5
    },

    maintenanceMode: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Setting",
  settingSchema
);