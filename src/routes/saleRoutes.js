const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createSale,

    getSales,

    getSaleById,

    updateSale,

    deleteSale

} = require("../controllers/saleController");

router.post(

    "/",

    protect,

    createSale

);

router.get(

    "/",

    getSales

);

router.get(

    "/:id",

    protect,

    getSaleById

);

router.put(

    "/:id",

    protect,

    updateSale

);

router.delete(

    "/:id",

    protect,

    deleteSale

);

module.exports = router;