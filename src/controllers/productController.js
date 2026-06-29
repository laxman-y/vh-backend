const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {

  try {

    const {
      name,
      category,
      brand,
      sku,
      description,
      purchasePrice,
      sellingPrice,
      stock,
      lowStockAlert,
      gst,
      warranty,
      status,
      images
    } = req.body;

    console.log("\n========== CREATE PRODUCT ==========");
    console.log("FULL REQUEST BODY:");
    console.log(JSON.stringify(req.body, null, 2));

    console.log("\nIMAGES RECEIVED:");
    console.log(JSON.stringify(images, null, 2));

    if (
      !name ||
      !category ||
      !sku ||
      !purchasePrice ||
      !sellingPrice
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });

    }

    const categoryExists =
      await Category.findById(category);

    if (!categoryExists) {

      return res.status(404).json({
        success: false,
        message: "Category not found"
      });

    }

    const skuExists =
      await Product.findOne({ sku });

    if (skuExists) {

      return res.status(400).json({
        success: false,
        message: "SKU already exists"
      });

    }

    const product = await Product.create({

      name,
      category,
      brand,
      sku,
      description,

      purchasePrice,
      sellingPrice,

      stock,
      lowStockAlert,

      gst,
      warranty,

      status,

      images: images || []

    });

    console.log("\nPRODUCT CREATED:");
    console.log(JSON.stringify(product, null, 2));

    res.status(201).json({

      success: true,

      product

    });

  } catch (error) {

    console.log("\nCREATE PRODUCT ERROR:");
    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getProducts = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i"
          }
        }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const total = await Product.countDocuments({
      ...keyword,
      ...category
    });

    const products = await Product.find({
      ...keyword,
      ...category
    })
      .populate("category")
      .populate("brand")
      .populate("supplier")
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("brand")
      .populate("supplier");

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }

    res.json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }

    if (
      product.images &&
      product.images.length > 0
    ) {

      for (const image of product.images) {

        if (image.public_id) {

          await cloudinary.uploader.destroy(
            image.public_id
          );

        }

      }

    }

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Product and images deleted successfully"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};




module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};