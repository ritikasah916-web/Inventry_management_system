const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Inventory Management System API is Running"
    });
});

// PRODUCT ROUTES (UNCHANGED)
app.use("/api/products", productRoutes);

// INVALID ROUTE HANDLER
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });
});

// CENTRALIZED ERROR HANDLER
app.use(errorMiddleware);

module.exports = app;