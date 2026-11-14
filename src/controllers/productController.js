const Product = require("../models/Product");

// 1. CREATE PRODUCT
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 2. GET ALL PRODUCTS (Filtering, Sorting, Pagination)
const getAllProducts = async (req, res, next) => {
    try {
        const {
            category,
            search,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(filter)
            .sort(sort || "-createdAt")
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / Number(limit)),
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// 3. GET SINGLE PRODUCT
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 4. UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 5. ADJUST STOCK
const adjustStock = async (req, res, next) => {
    try {
        const { adjustment } = req.body;

        if (!Number.isInteger(adjustment) || adjustment === 0) {
            return res.status(400).json({
                success: false,
                message: "Adjustment must be a non-zero whole number"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.quantity + adjustment < 0) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        product.quantity += adjustment;
        await product.save();

        res.status(200).json({
            success: true,
            message: "Stock adjusted successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 6. DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

// 7. LOW STOCK REPORT
const getLowStockProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: { $lte: ["$quantity", "$minStock"] }
        });

        res.status(200).json({
            success: true,
            totalLowStockProducts: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// 8. CATEGORY-WISE INVENTORY SUMMARY
const getCategorySummary = async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalInventoryValue: {
                        $sum: { $multiply: ["$price", "$quantity"] }
                    }
                }
            },
            {
                $sort: { totalQuantity: -1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: summary
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    adjustStock,
    deleteProduct,
    getLowStockProducts,
    getCategorySummary
};