const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    sku: {
      type: String,
      default: ""
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    returnedQuantity: {
    type: Number,
    default: 0
},

    purchasePrice: {
      type: Number,
      required: true
    },

    sellingPrice: {
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
      default: 0
    }
  });

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: true
    },

    customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    default: null
},

customerName: {
    type: String,
    default: "Walk In Customer",
    trim: true
},

    items: [invoiceItemSchema],

    totalItems: {
      type: Number,
      default: 0
    },

    totalQuantity: {
      type: Number,
      default: 0
    },

    subTotal: {
      type: Number,
      required: true
    },

    totalDiscount: {
      type: Number,
      default: 0
    },

    totalGST: {
      type: Number,
      default: 0
    },

    grandTotal: {
      type: Number,
      required: true
    },

    totalProfit: {
      type: Number,
      default: 0
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank"],
      default: "Cash"
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Paid"
    },
    
    invoiceStatus: {
    type: String,
    enum: [
        "Completed",
        "Partially Returned",
        "Fully Returned",
        "Cancelled"
    ],
    default: "Completed"
},

    remarks: {
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

module.exports = mongoose.model("Invoice", invoiceSchema);