const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

const createSale = async (req, res) => {

    try {

        const {

            product,

            customer,

            customerName,

            quantity,

            discount,

            gst,

            paymentMethod,

            paymentStatus,

            invoiceNumber,

            remarks

        } = req.body;

        const qty = Number(quantity);

        if (!product) {

            return res.status(400).json({

                success: false,

                message: "Product is required."

            });

        }

        if (qty <= 0) {

            return res.status(400).json({

                success: false,

                message: "Quantity must be greater than zero."

            });

        }

        const productData = await Product.findById(product);

        if (!productData) {

            return res.status(404).json({

                success: false,

                message: "Product not found."

            });

        }

        if (productData.stock < qty) {

            return res.status(400).json({

                success: false,

                message: "Insufficient stock."

            });

        }

        const sellingPrice = productData.sellingPrice;

        const purchasePrice = productData.purchasePrice;

        const subTotal = qty * sellingPrice;

        const discountAmount = Number(discount || 0);

        const taxableAmount =

            subTotal - discountAmount;

        const taxAmount =

            taxableAmount *

            Number(gst || 0) /

            100;

        const totalAmount =

            taxableAmount +

            taxAmount;

        const profit =

            (sellingPrice - purchasePrice)

            *

            qty

            -

            discountAmount;

        const sale = await Sale.create({

            product,

            customer:

                customer || null,

            customerName:

                customerName ||

                "Walk-in Customer",

            quantity: qty,

            purchasePrice,

            sellingPrice,

            discount: discountAmount,

            gst: Number(gst || 0),

            subTotal,

            taxAmount,

            totalAmount,

            profit,

            paymentMethod,

            paymentStatus,

            invoiceNumber,

            remarks

        });

        await Product.findByIdAndUpdate(

            product,

            {

                $inc: {

                    stock: -qty

                }

            }

        );

        res.status(201).json({

            success: true,

            sale

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getSales = async (req, res) => {

    try {

        const sales = await Sale.find()

            .populate("product")

            .populate("customer")

            .sort({

                createdAt: -1

            });

        res.json({

            success: true,

            sales

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getSaleById = async (req, res) => {

    try {

        const sale = await Sale.findById(

            req.params.id

        )

        .populate("product")

        .populate("customer");

        if (!sale) {

            return res.status(404).json({

                success: false,

                message: "Sale not found."

            });

        }

        res.json({

            success: true,

            sale

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updateSale = async (req, res) => {

    try {

        const sale = await Sale.findById(req.params.id);

        if (!sale) {

            return res.status(404).json({

                success: false,

                message: "Sale not found."

            });

        }

        const {

            product,
            customer,
            customerName,
            quantity,
            discount,
            gst,
            paymentMethod,
            paymentStatus,
            invoiceNumber,
            remarks

        } = req.body;

        const newQty = Number(quantity);

        if (!product) {

            return res.status(400).json({

                success: false,

                message: "Product is required."

            });

        }

        if (newQty <= 0) {

            return res.status(400).json({

                success: false,

                message: "Quantity must be greater than zero."

            });

        }

        const newProduct = await Product.findById(product);

        if (!newProduct) {

            return res.status(404).json({

                success: false,

                message: "Product not found."

            });

        }

        const oldProductId = sale.product.toString();

        const oldQty = sale.quantity;

        // Same Product
        if (oldProductId === product) {

            const difference = newQty - oldQty;

            if (difference > 0 && newProduct.stock < difference) {

                return res.status(400).json({

                    success: false,

                    message: "Insufficient stock."

                });

            }

            await Product.findByIdAndUpdate(

                product,

                {

                    $inc: {

                        stock: -difference

                    }

                }

            );

        }

        // Product Changed
        else {

            // Restore old product stock
            await Product.findByIdAndUpdate(

                oldProductId,

                {

                    $inc: {

                        stock: oldQty

                    }

                }

            );

            // Check stock of new product
            if (newProduct.stock < newQty) {

                return res.status(400).json({

                    success: false,

                    message: "Insufficient stock."

                });

            }

            // Reduce new product stock
            await Product.findByIdAndUpdate(

                product,

                {

                    $inc: {

                        stock: -newQty

                    }

                }

            );

        }

        const sellingPrice = newProduct.sellingPrice;

        const purchasePrice = newProduct.purchasePrice;

        const subTotal =

            sellingPrice * newQty;

        const discountAmount =

            Number(discount || 0);

        const taxableAmount =

            subTotal - discountAmount;

        const taxAmount =

            taxableAmount *

            Number(gst || 0) /

            100;

        const totalAmount =

            taxableAmount +

            taxAmount;

        const profit =

            (sellingPrice - purchasePrice)

            *

            newQty

            -

            discountAmount;

        sale.product = product;

        sale.customer = customer || null;

        sale.customerName =

            customerName ||

            "Walk-in Customer";

        sale.quantity = newQty;

        sale.purchasePrice = purchasePrice;

        sale.sellingPrice = sellingPrice;

        sale.discount = discountAmount;

        sale.gst = Number(gst || 0);

        sale.subTotal = subTotal;

        sale.taxAmount = taxAmount;

        sale.totalAmount = totalAmount;

        sale.profit = profit;

        sale.paymentMethod = paymentMethod;

        sale.paymentStatus = paymentStatus;

        sale.invoiceNumber = invoiceNumber;

        sale.remarks = remarks;

        await sale.save();

        res.json({

            success: true,

            sale

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const deleteSale = async (req, res) => {

    try {

        const sale = await Sale.findById(

            req.params.id

        );

        if (!sale) {

            return res.status(404).json({

                success: false,

                message: "Sale not found."

            });

        }

        const product = await Product.findById(

            sale.product

        );

        if (product) {

            await Product.findByIdAndUpdate(

                sale.product,

                {

                    $inc: {

                        stock: sale.quantity

                    }

                }

            );

        }

        await Sale.findByIdAndDelete(

            req.params.id

        );

        res.status(200).json({

            success: true,

            message: "Sale deleted successfully."

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

    createSale,

    getSales,

    getSaleById,

    updateSale,

    deleteSale

};