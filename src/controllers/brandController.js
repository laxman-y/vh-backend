const Brand = require("../models/Brand");
const cloudinary = require("../config/cloudinary");

const createBrand = async (req, res) => {

  try {

    const { name, description, logo } = req.body;

    const exists = await Brand.findOne({ name });

    if (exists) {

      return res.status(400).json({
        success: false,
        message: "Brand already exists"
      });

    }

    const brand = await Brand.create({
      name,
      description,
      logo
    });

    res.status(201).json({
      success: true,
      brand
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getBrands = async (req, res) => {

  try {

    const brands = await Brand.find();

    res.json({
      success: true,
      brands
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getBrandById = async (req, res) => {

  try {

    const brand = await Brand.findById(req.params.id);

    if (!brand) {

      return res.status(404).json({
        success: false,
        message: "Brand not found"
      });

    }

    res.json({
      success: true,
      brand
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updateBrand = async (req, res) => {

  try {

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      brand
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deleteBrand = async (req, res) => {

  try {

    const brand = await Brand.findById(req.params.id);

    if (!brand) {

      return res.status(404).json({
        success: false,
        message: "Brand not found"
      });

    }

    if (brand.logo?.public_id) {

      await cloudinary.uploader.destroy(
        brand.logo.public_id
      );

    }

    await Brand.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Brand deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand
};