const Setting = require("../models/Setting");

// ======================================
// GET SETTINGS
// ======================================

const getSettings = async (req, res) => {

  try {

    let settings = await Setting.findOne();

    // Create default settings if none exist

    if (!settings) {

      settings = await Setting.create({});

    }

    res.status(200).json({

      success: true,

      settings

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// CREATE SETTINGS
// (Runs only first time)
// ======================================

const createSettings = async (req, res) => {

  try {

    const existing = await Setting.findOne();

    if (existing) {

      return res.status(400).json({

        success: false,

        message: "Settings already exist."

      });

    }

    const settings = await Setting.create(req.body);

    res.status(201).json({

      success: true,

      message: "Settings created successfully.",

      settings

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// UPDATE SETTINGS
// ======================================

const updateSettings = async (req, res) => {

  try {

    let settings = await Setting.findOne();

    if (!settings) {

      settings = await Setting.create({});

    }

    settings = await Setting.findByIdAndUpdate(

      settings._id,

      req.body,

      {

        new: true,

        runValidators: true

      }

    );

    res.status(200).json({

      success: true,

      message: "Settings updated successfully.",

      settings

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// RESET SETTINGS
// ======================================

const resetSettings = async (req, res) => {

  try {

    await Setting.deleteMany();

    const settings = await Setting.create({});

    res.status(200).json({

      success: true,

      message: "Settings reset successfully.",

      settings

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// EXPORTS
// ======================================

module.exports = {

  getSettings,

  createSettings,

  updateSettings,

  resetSettings

};