const express =
require("express");

const router =
express.Router();

const {
getLowStockProducts
}
=
require(
"../controllers/alertController"
);

router.get(
"/low-stock",
getLowStockProducts
);

module.exports = router;