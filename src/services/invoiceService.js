const mongoose = require("mongoose");

const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Invoice = require("../models/Invoice");

const { decreaseStock } = require("./inventoryService");

const generateInvoiceNumber = require("../utils/generateInvoiceNumber");
const calculateInvoice = require("../utils/calculateInvoice");

const createInvoice = async (data) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const {
            customer = null,
            customerName = "Walk In Customer",
            paymentMethod = "Cash",
            paymentStatus = "Paid",
            remarks = "",
            items
        } = data;

        // ===============================
        // VALIDATION
        // ===============================

        if (!items || items.length === 0) {
            throw new Error("Invoice must contain at least one product.");
        }

        // ===============================
        // CUSTOMER VALIDATION
        // ===============================

        if (customer) {

            const customerExists = await Customer
                .findById(customer)
                .session(session);

            if (!customerExists) {
                throw new Error("Customer not found.");
            }

        }

        // ===============================
        // PROCESS PRODUCTS
        // ===============================

        const invoiceItems = [];

        for (const item of items) {

            const product = await Product
                .findById(item.product)
                .session(session);

            if (!product) {
                throw new Error(`Product not found : ${item.product}`);
            }

            if (!product.status) {
                throw new Error(`${product.name} is inactive.`);
            }

            if (product.stock < item.quantity) {
                throw new Error(
                    `${product.name} has only ${product.stock} item(s) left.`
                );
            }

            const purchasePrice = product.purchasePrice;

            const sellingPrice = product.sellingPrice;

            const gst = product.gst;

            const discount = item.discount || 0;

            const subTotal = sellingPrice * item.quantity;

            const taxAmount = (subTotal * gst) / 100;

            const totalAmount = subTotal + taxAmount - discount;

            const profit =
                (sellingPrice - purchasePrice) * item.quantity;

            invoiceItems.push({

                product: product._id,

                productName: product.name,

                sku: product.sku,

                quantity: item.quantity,

                purchasePrice,

                sellingPrice,

                discount,

                gst,

                subTotal,

                taxAmount,

                totalAmount,

                profit

            });

        }

        // ===============================
        // TOTAL CALCULATION
        // ===============================

        const totals = calculateInvoice(invoiceItems);

        // ===============================
        // INVOICE NUMBER
        // ===============================

        const invoiceNumber =
            await generateInvoiceNumber();

        // ===============================
        // CREATE INVOICE
        // ===============================

        const invoices = await Invoice.create(

            [
                {

                    invoiceNumber,

                    customer,

                    customerName,

                    items: invoiceItems,

                    totalItems: totals.totalItems,

                    totalQuantity: totals.totalQuantity,

                    subTotal: totals.subTotal,

                    totalGST: totals.totalGST,

                    totalDiscount: totals.totalDiscount,

                    grandTotal: totals.grandTotal,

                    totalProfit: totals.totalProfit,

                    paymentMethod,

                    paymentStatus,

                    remarks

                }

            ],

            { session }

        );

        const createdInvoice = invoices[0];

        // ===============================
        // UPDATE STOCK + LEDGER
        // ===============================

        for (const item of invoiceItems) {

            await decreaseStock({

                productId: item.product,

                quantity: item.quantity,

                invoiceId: createdInvoice._id,

                adminId: null,

                session

            });

        }

        // ===============================
        // COMMIT
        // ===============================

        await session.commitTransaction();

        session.endSession();

        return createdInvoice;

    }

    catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

};

module.exports = {

    createInvoice

};