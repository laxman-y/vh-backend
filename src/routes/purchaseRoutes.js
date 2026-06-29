const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

    createPurchase,

    getPurchases,

    getPurchaseById,

    updatePurchase,

    deletePurchase

} = require("../controllers/purchaseController");

router.post(
  "/",
  protect,
  createPurchase
);

router.get(
  "/",
  getPurchases
);

router.get(
    "/:id",
    protect,
    getPurchaseById
);

router.put(
    "/:id",
    protect,
    updatePurchase
);

router.delete(
    "/:id",
    protect,
    deletePurchase
);

module.exports = router;