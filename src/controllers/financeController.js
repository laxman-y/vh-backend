const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Expense = require("../models/Expense");
const Product = require("../models/Product");

const getFinanceStats = async (req, res) => {

    try {

        const sales =
            await Sale.find();

        const purchases =
            await Purchase.find();

        const expenses =
            await Expense.find();

        const products =
            await Product.find();

       

        const totalSales =
sales.reduce(
(sum,item)=>
sum + (item.totalAmount || 0),
0
);

const totalProfit =
sales.reduce(
(sum,item)=>
sum + (item.profit || 0),
0
);

const totalPurchases =
purchases.reduce(
(sum,item)=>
sum + (item.totalAmount || 0),
0
);

const totalExpenses =
expenses.reduce(
(sum,item)=>
sum + (item.amount || 0),
0
);

const inventoryValue =
products.reduce(
(sum,item)=>
sum +
((item.stock || 0) *
(item.purchasePrice || 0)),
0
);


            

        const netProfit =
            totalProfit -
            totalExpenses;

        res.json({

            success: true,

            stats: {
                totalSales,
                totalProfit,
                totalPurchases,
                totalExpenses,
                inventoryValue,
                netProfit
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getFinanceStats
};