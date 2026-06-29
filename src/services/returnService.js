const mongoose = require("mongoose");

const Invoice = require("../models/Invoice");
const Return = require("../models/Return");

const generateReturnNumber = require("../utils/generateReturnNumber");

const { increaseStock } = require("./inventoryService");

const createReturn = async (data) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const {

            invoiceId,

            items,

            refundMethod = "Cash",

            returnType = "Refund",

            remarks = ""

        } = data;

        const invoice = await Invoice
            .findById(invoiceId)
            .session(session);

        if (!invoice) {

            throw new Error("Invoice not found.");

        }

        if (!items || items.length === 0) {

            throw new Error("No return items found.");

        }

        let returnItems = [];

        let totalRefund = 0;

        for (const item of items) {

            // ====================================
            // Find invoice item
            // ====================================

            const invoiceItem = invoice.items.id(
                item.invoiceItemId
            );

            if (!invoiceItem) {

                throw new Error("Invoice Item not found.");

            }

            // ====================================
            // Already Returned
            // ====================================

            const available =

                invoiceItem.quantity -

                invoiceItem.returnedQuantity;

            if (

                item.returnedQuantity >

                available

            ) {

                throw new Error(

                    `${invoiceItem.productName}

Available : ${available}

Already Returned : ${invoiceItem.returnedQuantity}`

                );

            }

            // ====================================
            // Update invoice item
            // ====================================

            invoiceItem.returnedQuantity +=

                item.returnedQuantity;

            // ====================================
            // Refund
            // ====================================

            const refundAmount =

                item.returnedQuantity *

                invoiceItem.sellingPrice;

            totalRefund += refundAmount;

            // ====================================
            // Inventory
            // ====================================

            await increaseStock({

                productId: invoiceItem.product,

                quantity: item.returnedQuantity,

                invoiceId: invoice._id,

                condition: item.condition,

                session

            });

            // ====================================
            // Return Item
            // ====================================

            returnItems.push({

                product: invoiceItem.product,

                productName: invoiceItem.productName,

                invoiceItemId: invoiceItem._id,

                soldQuantity: invoiceItem.quantity,

                returnedQuantity: item.returnedQuantity,

                refundAmount,

                condition: item.condition,

                reason: item.reason || ""

            });

        }
        const fullyReturned = invoice.items.every(item =>
            item.quantity === item.returnedQuantity
        );

        const partiallyReturned = invoice.items.some(item =>
            item.returnedQuantity > 0
        );

        if (fullyReturned) {

            invoice.invoiceStatus = "Fully Returned";

        }

        else if (partiallyReturned) {

            invoice.invoiceStatus = "Partially Returned";

        }

        else {

            invoice.invoiceStatus = "Completed";

        }

        await invoice.save({ session });

        await session.commitTransaction();

        session.endSession();

        return returns[0];

    }

    catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

};

module.exports = {

    createReturn

};