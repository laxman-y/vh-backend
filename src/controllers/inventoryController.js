const Product = require("../models/Product");

const getInventory = async (req, res) => {

    try {

        const products = await Product.find()

            .populate("category")

            .populate("brand")

            .sort({

                createdAt: -1

            });

        let totalInventoryValue = 0;

        let totalStock = 0;

        let inStock = 0;

        let lowStock = 0;

        let outOfStock = 0;

        products.forEach((product) => {

            totalInventoryValue +=

                product.purchasePrice *

                product.stock;

            totalStock += product.stock;

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

            stats: {

                totalProducts:

                    products.length,

                totalStock,

                totalInventoryValue,

                inStock,

                lowStock,

                outOfStock

            },

            products

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
  getInventory
};