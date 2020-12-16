const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/searchController");
const { sortProducts } = require("../controllers/sortController");

//===========================================
//                 Search
//===========================================

router.post("/searchProducts", searchProducts);
router.post("/sortProducts", sortProducts);

module.exports = router;
