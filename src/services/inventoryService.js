const Product = require("../models/Product");
const InventoryTransaction = require("../models/InventoryTransaction");

const decreaseStock = async ({
    productId,
    quantity,
    invoiceId = null,
    adminId = null,
    session = null
}) => {

    let query = Product.findById(productId);

    if (session) {
        query = query.session(session);
    }

    const product = await query;

    if (!product) {
        throw new Error("Product not found.");
    }

    if (product.stock < quantity) {
        throw new Error(`${product.name} has only ${product.stock} item(s) in stock.`);
    }

    const stockBefore = product.stock;

    product.stock -= quantity;

    const stockAfter = product.stock;

    if (session) {
        await product.save({ session });
    } else {
        await product.save();
    }

    const transaction = {
        product: product._id,
        invoice: invoiceId,
        transactionType: "SALE",
        quantity,
        stockBefore,
        stockAfter,
        createdBy: adminId
    };

    if (session) {
        await InventoryTransaction.create([transaction], { session });
    } else {
        await InventoryTransaction.create(transaction);
    }

    return product;
};

const increaseStock = async ({

    productId,

    quantity,

    invoiceId = null,

    adminId = null,

    condition = "GOOD",

    session = null

}) => {

    let query = Product.findById(productId);

    if (session) {

        query = query.session(session);

    }

    const product = await query;

    if (!product) {

        throw new Error("Product not found.");

    }

    const stockBefore = product.stock;

    if (condition === "GOOD") {

        product.stock += quantity;

    }

    else {

        product.damagedStock += quantity;

    }

    const stockAfter = product.stock;

    if (session) {

        await product.save({ session });

    }

    else {

        await product.save();

    }

    const transaction = {

        product: product._id,

        invoice: invoiceId,

        transactionType: "CUSTOMER_RETURN",

        quantity,

        stockBefore,

        stockAfter,

        createdBy: adminId

    };

    if (session) {

        await InventoryTransaction.create(

            [transaction],

            { session }

        );

    }

    else {

        await InventoryTransaction.create(

            transaction

        );

    }

    return product;

};
module.exports = {

    decreaseStock,

    increaseStock

};