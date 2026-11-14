const validateProduct = (req, res, next) => {
    const { name, sku, category, price, quantity, minStock } = req.body;

    const errors = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        errors.push("Product name must contain at least 2 characters");
    }

    if (!sku || typeof sku !== "string" || !sku.trim()) {
        errors.push("Valid SKU is required");
    }

    if (!category || typeof category !== "string" || !category.trim()) {
        errors.push("Product category is required");
    }

    if (price === undefined || typeof price !== "number" || !Number.isFinite(price) || price < 0) {
        errors.push("Price must be a valid non-negative number");
    }

    if (
        quantity !== undefined &&
        (!Number.isInteger(quantity) || quantity < 0)
    ) {
        errors.push("Quantity must be a non-negative whole number");
    }

    if (
        minStock !== undefined &&
        (!Number.isInteger(minStock) || minStock < 0)
    ) {
        errors.push("Minimum stock must be a non-negative whole number");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

module.exports = { validateProduct };