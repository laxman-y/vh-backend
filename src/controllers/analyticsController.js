const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

// ==========================
// Monthly Sales
// ==========================
const getMonthlySales = async (req, res) => {

  try {

    const sales = await Sale.find();

    const monthlySales =
      new Array(12).fill(0);

    sales.forEach((sale) => {

      const month =
        new Date(sale.createdAt).getMonth();

      monthlySales[month] +=
        sale.totalAmount;

    });

    res.json({

      success: true,

      labels: monthNames,

      sales: monthlySales

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================
// Monthly Purchases
// ==========================
const getMonthlyPurchases = async (req, res) => {

  try {

    const purchases =
      await Purchase.find();

    const monthlyPurchases =
      new Array(12).fill(0);

    purchases.forEach((purchase) => {

      const month =
        new Date(
          purchase.createdAt
        ).getMonth();

      monthlyPurchases[month] +=
        purchase.totalAmount;

    });

    res.json({

      success: true,

      labels: monthNames,

      purchases: monthlyPurchases

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================
// Inventory Status
// ==========================
const getInventoryChart =
async (req, res) => {

  try {

    const products =
      await Product.find();

    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    products.forEach((product) => {

      if (product.stock === 0) {

        outOfStock++;

      }

      else if (
        product.stock <=
        product.lowStockAlert
      ) {

        lowStock++;

      }

      else {

        inStock++;

      }

    });

    res.json({

      success: true,

      labels: [

        "In Stock",

        "Low Stock",

        "Out Of Stock"

      ],

      values: [

        inStock,

        lowStock,

        outOfStock

      ]

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  getMonthlySales,

  getMonthlyPurchases,

  getInventoryChart

};