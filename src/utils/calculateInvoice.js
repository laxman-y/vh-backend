const calculateInvoice = (items) => {

    let totalQuantity = 0;

    let totalItems = items.length;

    let subTotal = 0;

    let totalGST = 0;

    let totalDiscount = 0;

    let grandTotal = 0;

    let totalProfit = 0;

    items.forEach(item => {

        totalQuantity += item.quantity;

        subTotal += item.subTotal;

        totalGST += item.taxAmount;

        totalDiscount += item.discount;

        grandTotal += item.totalAmount;

        totalProfit += item.profit;

    });

    return {

        totalItems,

        totalQuantity,

        subTotal,

        totalGST,

        totalDiscount,

        grandTotal,

        totalProfit

    };

};

module.exports = calculateInvoice;