const Customer = require("../models/Customer");

// ===========================
// Create Customer
// ===========================

const createCustomer = async (req, res) => {

  try {

    const existingCustomer =
      await Customer.findOne({
        phone: req.body.phone
      });

    if (existingCustomer) {

      return res.status(400).json({

        success: false,

        message:
          "Customer already exists"

      });

    }

    const customer =
      await Customer.create(req.body);

    res.status(201).json({

      success: true,

      customer

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===========================
// Get All Customers
// ===========================

const getCustomers = async (req, res) => {

  try {

    const customers =
      await Customer.find()
        .sort({
          createdAt: -1
        });

    res.json({

      success: true,

      totalCustomers:
        customers.length,

      customers

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===========================
// Get Customer By ID
// ===========================

const getCustomerById = async (req, res) => {

  try {

    const customer =
      await Customer.findById(
        req.params.id
      );

    if (!customer) {

      return res.status(404).json({

        success: false,

        message:
          "Customer not found"

      });

    }

    res.json({

      success: true,

      customer

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===========================
// Update Customer
// ===========================

const updateCustomer = async (req, res) => {

  try {

    const customer =
      await Customer.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true
        }

      );

    if (!customer) {

      return res.status(404).json({

        success: false,

        message:
          "Customer not found"

      });

    }

    res.json({

      success: true,

      customer

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ===========================
// Delete Customer
// ===========================

const deleteCustomer = async (req, res) => {

  try {

    const customer =
      await Customer.findByIdAndDelete(
        req.params.id
      );

    if (!customer) {

      return res.status(404).json({

        success: false,

        message:
          "Customer not found"

      });

    }

    res.json({

      success: true,

      message:
        "Customer deleted successfully"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  createCustomer,

  getCustomers,

  getCustomerById,

  updateCustomer,

  deleteCustomer

};