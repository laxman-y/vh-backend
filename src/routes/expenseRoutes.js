const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {
createExpense,
getExpenses
}
=
require(
"../controllers/expenseController"
);

router.post(
"/",
protect,
createExpense
);

router.get(
"/",
getExpenses
);

module.exports = router;