const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    images: [
      {
        public_id: String,
        url: String
      }
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    },

    // sku: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },

    description: {
      type: String,
      default: ""
    },

    purchasePrice: {
      type: Number,
      required: true
    },

    sellingPrice: {
      type: Number,
      required: true
       default: 0
    },

    stock: {
      type: Number,
      default: 0
    },

    damagedStock: {
      type: Number,
      default: 0
    },

    reservedStock: {
      type: Number,
      default: 0
    },

    soldStock: {
      type: Number,
      default: 0
    },

    purchasedStock: {
      type: Number,
      default: 0
    },

    lowStockAlert: {
      type: Number,
      default: 5
    },

    gst: {
      type: Number,
      default: 0
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier"
    },

    unit: {
      type: String,
      default: "Piece"
    },

    barcode: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
    },

    warranty: {
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
  "Product",
  productSchema
);
