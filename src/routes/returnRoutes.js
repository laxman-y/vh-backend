const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createReturnController,

    getReturns

} = require("../controllers/returnController");

router.post(
    "/",
    protect,
    createReturnController
);

router.get(
    "/",
    protect,
    getReturns
);

module.exports = router;