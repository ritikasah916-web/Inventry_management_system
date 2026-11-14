# Inventory-Management-System
# Inventory Management System

A RESTful backend application developed using Node.js, Express.js, MongoDB, and Mongoose to manage product inventory efficiently.

## Project Overview

The Inventory Management System is designed to simplify inventory operations by providing APIs for managing products, tracking stock levels, updating product details, and generating inventory reports.

The application supports product CRUD operations, filtering, sorting, pagination, stock adjustments, low-stock alerts, and category-wise inventory summaries.

## Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **dotenv** – Environment variable management
- **Postman** – API testing

## Features

### 1. Product Management
- Create new products.
- Retrieve all products.
- Retrieve individual products by ID.
- Update product information.
- Delete products.

### 2. Inventory Management
- Adjust product stock quantities.
- Prevent stock quantities from becoming negative.
- Configure minimum stock levels.
- Identify products requiring restocking.

### 3. Product Querying
- Filter products by category.
- Search products by name.
- Sort products.
- Retrieve products using pagination.

### 4. Inventory Reports
- Generate low-stock reports.
- Generate category-wise inventory summaries.
- Calculate total products and quantities.
- Calculate total inventory value.

### 5. Validation and Error Handling
- Product field validation.
- Duplicate SKU detection.
- Invalid MongoDB ID handling.
- Centralized error-handling middleware.

## Project Structure

```text
Inventory-Management-System/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   └── Product.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js
- MongoDB Community Server
- MongoDB Compass
- Postman

### Step 1: Clone the Repository

```bash
git clone https://github.com/siya809026-dot/Inventory-Management-System.git
```

### Step 2: Navigate to the Project

```bash
cd Inventory-Management-System
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the project root directory.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/InventoryDB
```

Make sure your local MongoDB server is running.

### Step 5: Start the Server

```bash
npm run dev
```

The server will run at:

```text
http://localhost:5000
```

## API Documentation

Base URL:

```text
http://localhost:5000/api/products
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a product |
| GET | `/` | Get all products |
| GET | `/:id` | Get product by ID |
| PUT | `/:id` | Update product |
| PATCH | `/:id/stock` | Adjust product stock |
| DELETE | `/:id` | Delete product |
| GET | `/low-stock` | Get low-stock products |
| GET | `/category-summary` | Get category-wise inventory summary |

### Product Filtering, Searching, Sorting and Pagination

Examples:

**Filter by category**
```text
GET /api/products?category=Electronics
```


**Search by product name**
```text
GET /api/products?search=Laptop
```

**Sort by price (ascending)**
```text
GET /api/products?sort=price
```

**Sort by price (descending)**
```text
GET /api/products?sort=-price
```

**Pagination**
```text
GET /api/products?page=1&limit=5
```

## Sample Product JSON

Use the following JSON when creating a product:

```json
{
    "name": "Laptop",
    "sku": "LAP001",
    "category": "Electronics",
    "price": 55000,
    "quantity": 20,
    "minStock": 5,
    "description": "HP Laptop",
    "supplier": "HP India"
}
```

## Database Information

- **Database:** InventoryDB
- **Collection:** products

The application uses MongoDB locally, with Mongoose handling database operations and schema validation.

## Testing

All APIs are tested using Postman.

The following operations have been tested:

- Product creation
- Product retrieval
- Product updating
- Product deletion
- Filtering and searching
- Sorting and pagination
- Stock adjustment
- Low-stock reporting
- Category-wise aggregation
- Input validation

## Learning Outcomes

Through this project, the following concepts were implemented:

- REST API development
- Node.js and Express.js
- MongoDB database integration
- Mongoose schemas and validation
- CRUD operations
- Query parameters
- MongoDB aggregation pipelines
- Middleware implementation
- Error handling
- API testing using Postman

## Author

**Siya Singh**

B.Tech – Computer Science and Engineering (AI & ML)

K.R. Mangalam University
