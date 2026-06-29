const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Expense = require("../models/Expense");
const Product = require("../models/Product");

// ===================================================
// Dashboard Report
// ===================================================

const getDashboardReport = async (req, res) => {

  try {

    const sales = await Sale.find();

    const purchases = await Purchase.find();

    const expenses = await Expense.find();

    const products = await Product.find();

    const totalSales = sales.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const totalPurchases = purchases.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalProfit = sales.reduce(
      (sum, item) => sum + (item.profit || 0),
      0
    );

    const inventoryValue = products.reduce(
      (sum, item) =>
        sum + (item.stock * item.purchasePrice),
      0
    );

    const netProfit =
      totalProfit - totalExpenses;

    res.json({

      success: true,

      report: {

        totalSales,

        totalPurchases,

        totalExpenses,

        totalProfit,

        inventoryValue,

        netProfit

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===================================================
// Sales Report
// ===================================================

const getSalesReport = async (req, res) => {

  try {

    const sales =
      await Sale.find()
        .populate("product")
        .populate("customer")
        .sort({ createdAt: -1 });

    const totalSales =
      sales.reduce(
        (sum, item) =>
          sum + item.totalAmount,
        0
      );

    const totalProfit =
      sales.reduce(
        (sum, item) =>
          sum + (item.profit || 0),
        0
      );

    res.json({

      success: true,

      totalInvoices:
        sales.length,

      totalSales,

      totalProfit,

      sales

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===================================================
// Purchase Report
// ===================================================

const getPurchaseReport = async (req, res) => {

  try {

    const purchases =
      await Purchase.find()
        .populate("product")
        .populate("customer")
        .populate("supplier")
        .sort({ createdAt: -1 });

    const totalPurchases =
      purchases.reduce(
        (sum, item) =>
          sum + item.totalAmount,
        0
      );

    res.json({

      success: true,

      totalInvoices:
        purchases.length,

      totalPurchases,

      purchases

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===================================================
// Expense Report
// ===================================================

const getExpenseReport = async (req, res) => {

  try {

    const expenses =
      await Expense.find()
        .sort({ expenseDate: -1 });

    const totalExpenses =
      expenses.reduce(
        (sum, item) =>
          sum + item.amount,
        0
      );

    res.json({

      success: true,

      totalExpenses,

      totalRecords:
        expenses.length,

      expenses

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===================================================
// Inventory Report
// ===================================================

const getInventoryReport = async (req, res) => {

  try {

    const products =
      await Product.find()
        .populate("category")
        .populate("brand")
        .populate("supplier")
        .sort({ name: 1 });

    const inventoryValue =
      products.reduce(
        (sum, item) =>
          sum + (item.stock * item.purchasePrice),
        0
      );

    const totalStock =
      products.reduce(
        (sum, item) =>
          sum + item.stock,
        0
      );

    const lowStockProducts =
      products.filter(
        (item) =>
          item.stock <=
          item.lowStockAlert
      );

    const outOfStockProducts =
      products.filter(
        (item) =>
          item.stock === 0
      );

    res.json({

      success: true,

      totalProducts:
        products.length,

      totalStock,

      inventoryValue,

      lowStockCount:
        lowStockProducts.length,

      outOfStockCount:
        outOfStockProducts.length,

      products

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===================================================
// Profit & Loss Report
// ===================================================

const getProfitLossReport = async (req, res) => {

  try {

    const sales =
      await Sale.find();

    const purchases =
      await Purchase.find();

    const expenses =
      await Expense.find();

    const totalSales =
      sales.reduce(
        (sum, item) =>
          sum + item.totalAmount,
        0
      );

    const totalPurchases =
      purchases.reduce(
        (sum, item) =>
          sum + item.totalAmount,
        0
      );

    const totalExpenses =
      expenses.reduce(
        (sum, item) =>
          sum + item.amount,
        0
      );

    const grossProfit =
      sales.reduce(
        (sum, item) =>
          sum + (item.profit || 0),
        0
      );

    const netProfit =
      grossProfit - totalExpenses;

    res.json({

      success: true,

      report: {

        totalSales,

        totalPurchases,

        totalExpenses,

        grossProfit,

        netProfit

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===================================================

module.exports = {

  getDashboardReport,

  getSalesReport,

  getPurchaseReport,

  getExpenseReport,

  getInventoryReport,

  getProfitLossReport

};