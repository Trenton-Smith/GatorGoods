const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");

/**
 * File name: productRouter.js
 * Purpose: This is the router for post requests made from NewListin.js
 *          for creating new product listing from seller.
 * Authors: YG
 */
router.post("/createProduct", createProduct);

module.exports = router;
