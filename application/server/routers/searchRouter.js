const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/searchController");
const { sortProducts } = require("../controllers/sortController");

/**
 * File name: searchRouter.js
 * Purpose: This is the router for searching products and sorting products.
 * Authors: YG
 */

router.post("/searchProducts", searchProducts);
router.post("/sortProducts", sortProducts);

module.exports = router;
