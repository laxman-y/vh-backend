const Return = require("../models/Return");

const { createReturn } = require("../services/returnService");

// ===================================
// CREATE RETURN
// ===================================

const createReturnController = async (req, res) => {

    try {

        const returns = await createReturn(req.body);

        res.status(201).json({

            success: true,

            message: "Return created successfully.",

            returns

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

// ===================================
// GET RETURNS
// ===================================

const getReturns = async (req, res) => {

    try {

        const returns = await Return.find()

            .populate("invoice")

            .populate("customer")

            .populate("items.product")

            .sort({ createdAt: -1 });

        res.json({

            success: true,

            returns

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createReturnController,

    getReturns

};