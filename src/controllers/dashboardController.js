const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");

const getDashboardStats = async (req, res) => {

  try {

    const totalProducts =
      await Product.countDocuments();

    const totalCategories =
      await Category.countDocuments();

    const totalBrands =
      await Brand.countDocuments();

    const totalSuppliers =
      await Supplier.countDocuments();

    const purchases =
      await Purchase.find();

    const sales =
      await Sale.find();

    const totalPurchases =
      purchases.reduce(
        (sum, item) => sum + item.totalAmount,
        0
      );

    const totalSales =
      sales.reduce(
        (sum, item) => sum + item.totalAmount,
        0
      );

    const totalProfit =
      sales.reduce(
        (sum, item) => sum + (item.profit || 0),
        0
      );

    const lowStockProducts =
      await Product.find({
        $expr: {
          $lte: [
            "$stock",
            "$lowStockAlert"
          ]
        }
      });

    res.json({

      success: true,

      stats: {

        totalProducts,
        totalCategories,
        totalBrands,
        totalSuppliers,

        totalPurchases,
        totalSales,
        totalProfit,

        lowStockCount:
          lowStockProducts.length

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



const getRecentSales = async (req, res) => {

  try {

    const sales =
      await Sale.find()
        .populate("product")
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({

      success: true,

      sales

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



const getRecentPurchases = async (req, res) => {

  try {

    const purchases =
      await Purchase.find()
        .populate("product")
        .populate("supplier")
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({

      success: true,

      purchases

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



module.exports = {

  getDashboardStats,

  getRecentSales,

  getRecentPurchases

};