const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/searchController");

//===========================================
//                 Search
//===========================================

router.post("/searchProducts", searchProducts);

module.exports = router;
