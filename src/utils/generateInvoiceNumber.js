const Invoice = require("../models/Invoice");

const generateInvoiceNumber = async () => {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const prefix = `INV-${year}${month}${day}`;

    const latestInvoice = await Invoice.findOne({
        invoiceNumber: {
            $regex: `^${prefix}`
        }
    }).sort({ createdAt: -1 });

    let sequence = 1;

    if (latestInvoice) {

        const lastSequence = latestInvoice.invoiceNumber.split("-").pop();

        sequence = Number(lastSequence) + 1;

    }

    return `${prefix}-${String(sequence).padStart(4, "0")}`;

};

module.exports = generateInvoiceNumber;