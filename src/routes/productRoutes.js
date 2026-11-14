const express = require("express");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    adjustStock,
    deleteProduct,
    getLowStockProducts,
    getCategorySummary
} = require("../controllers/productController");

const { validateProduct } = require("../middleware/validationMiddleware");

// CREATE PRODUCT
router.post("/", validateProduct, createProduct);

// LOW STOCK REPORT
router.get("/low-stock", getLowStockProducts);

// CATEGORY SUMMARY
router.get("/category-summary", getCategorySummary);

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// GET PRODUCT BY ID
router.get("/:id", getProductById);

// UPDATE PRODUCT
router.put("/:id", validateProduct, updateProduct);

// ADJUST STOCK
router.patch("/:id/stock", adjustStock);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;