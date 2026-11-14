const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: [2, "Product name must contain at least 2 characters"],
            maxlength: [100, "Product name cannot exceed 100 characters"]
        },

        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            trim: true,
            uppercase: true
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "Quantity cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number"
            }
        },

        minStock: {
            type: Number,
            default: 5,
            min: [0, "Minimum stock cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Minimum stock must be a whole number"
            }
        },

        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },

        supplier: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;