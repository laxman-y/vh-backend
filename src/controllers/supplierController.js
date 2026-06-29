const Supplier = require("../models/Supplier");

const createSupplier = async (req, res) => {

  try {

    const supplier = await Supplier.create(req.body);

    res.status(201).json({
      success: true,
      supplier
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getSuppliers = async (req, res) => {

  try {

    const suppliers = await Supplier.find();

    res.json({
      success: true,
      suppliers
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getSupplierById = async (req, res) => {

  try {

    const supplier = await Supplier.findById(
      req.params.id
    );

    if (!supplier) {

      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });

    }

    res.json({
      success: true,
      supplier
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updateSupplier = async (req, res) => {

  try {

    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      supplier
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deleteSupplier = async (req, res) => {

  try {

    await Supplier.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Supplier deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};