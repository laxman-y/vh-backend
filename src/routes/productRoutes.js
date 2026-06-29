const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post(
  "/",
  protect,
  createProduct
);

router.get(
  "/",
  getProducts
);



router.get("/:id", getProductById);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

router.post(
  "/upload",
  protect,
  upload.single("image"),
  async (req, res) => {

    try {

      console.log("FILE RECEIVED:");
      console.log(req.file);

      const result =
        await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "hardware-shop"
          }
        );

      console.log("CLOUDINARY RESULT:");
      console.log(result);

      return res.status(200).json({

        success: true,

        image: {

          public_id:
            result.public_id,

          url:
            result.secure_url

        }

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message: error.message

      });

    }

  }
);

module.exports = router;