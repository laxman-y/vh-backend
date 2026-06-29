const mongoose = require("mongoose");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const createPurchase = async (req, res) => {

    try {

        const {

            product,
            supplier,
            quantity,
            purchasePrice,
            invoiceNumber,
            remarks

        } = req.body;

        const qty = Number(quantity);
        const price = Number(purchasePrice);

        if (!product || !supplier) {

            return res.status(400).json({

                success: false,

                message: "Product and Supplier are required."

            });

        }

        if (qty <= 0) {

            return res.status(400).json({

                success: false,

                message: "Quantity must be greater than zero."

            });

        }

        if (price <= 0) {

            return res.status(400).json({

                success: false,

                message: "Purchase price must be greater than zero."

            });

        }

        const productExists = await Product.findById(product);

        if (!productExists) {

            return res.status(404).json({

                success: false,

                message: "Product not found."

            });

        }

        const purchase = await Purchase.create({

            product,

            supplier,

            quantity: qty,

            purchasePrice: price,

            totalAmount: qty * price,

            invoiceNumber,

            remarks

        });

        await Product.findByIdAndUpdate(

            product,

            {

                $inc: {

                    stock: qty

                }

            }

        );

        res.status(201).json({

            success: true,

            purchase

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getPurchases = async (req, res) => {

    try {

        const purchases = await Purchase.find()

            .populate("product")

            .populate("supplier")

            .sort({

                createdAt: -1

            });

        res.json({

            success: true,

            purchases

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getPurchaseById = async (req, res) => {

    try {

        const purchase = await Purchase.findById(

            req.params.id

        )

            .populate("product")

            .populate("supplier");

        if (!purchase) {

            return res.status(404).json({

                success: false,

                message: "Purchase not found."

            });

        }

        res.json({

            success: true,

            purchase

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updatePurchase = async (req, res) => {

    try {

        const purchase = await Purchase.findById(req.params.id);

        if (!purchase) {

            return res.status(404).json({

                success: false,

                message: "Purchase not found."

            });

        }

        const {

            product,

            supplier,

            quantity,

            purchasePrice,

            invoiceNumber,

            remarks

        } = req.body;

        const newQty = Number(quantity);

        const newPrice = Number(purchasePrice);

        if (!product || !supplier) {

            return res.status(400).json({

                success: false,

                message: "Product and Supplier are required."

            });

        }

        if (newQty <= 0) {

            return res.status(400).json({

                success: false,

                message: "Quantity must be greater than zero."

            });

        }

        if (newPrice <= 0) {

            return res.status(400).json({

                success: false,

                message: "Purchase price must be greater than zero."

            });

        }

        const productExists = await Product.findById(product);

        if (!productExists) {

            return res.status(404).json({

                success: false,

                message: "Product not found."

            });

        }

        const oldProduct = purchase.product.toString();

        const oldQty = purchase.quantity;

        // Same Product
        if (oldProduct === product) {

            const difference = newQty - oldQty;

            await Product.findByIdAndUpdate(

                oldProduct,

                {

                    $inc: {

                        stock: difference

                    }

                }

            );

        }

        // Product Changed
        else {

            // Remove stock from old product
            await Product.findByIdAndUpdate(

                oldProduct,

                {

                    $inc: {

                        stock: -oldQty

                    }

                }

            );

            // Add stock to new product
            await Product.findByIdAndUpdate(

                product,

                {

                    $inc: {

                        stock: newQty

                    }

                }

            );

        }

        purchase.product = product;

        purchase.supplier = supplier;

        purchase.quantity = newQty;

        purchase.purchasePrice = newPrice;

        purchase.totalAmount = newQty * newPrice;

        purchase.invoiceNumber = invoiceNumber;

        purchase.remarks = remarks;

        await purchase.save();

        res.json({

            success: true,

            purchase

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const deletePurchase = async (req, res) => {

    try {

        const purchase = await Purchase.findById(

            req.params.id

        );

        if (!purchase) {

            return res.status(404).json({

                success: false,

                message: "Purchase not found."

            });

        }

        const product = await Product.findById(

            purchase.product

        );

        if (product) {

            await Product.findByIdAndUpdate(

                purchase.product,

                {

                    $inc: {

                        stock: -purchase.quantity

                    }

                }

            );

        }

        await Purchase.findByIdAndDelete(

            req.params.id

        );

        res.status(200).json({

            success: true,

            message: "Purchase deleted successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createPurchase,

    getPurchases,

    getPurchaseById,

    updatePurchase,

    deletePurchase

};