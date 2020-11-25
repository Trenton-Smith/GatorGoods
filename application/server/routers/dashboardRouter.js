/**
 * File name: dashboardRouter.js
 * Purpose: This is the router for post requests made from Dashboard.js -> DashboardListings.js and
 *          Dashboard.js -> DashboardListingCard.js. Only two routes are needed as currently we only allow users to
 *          delete, not list/delist from their dashboard.
 * Authors: YG, Trenton
 */
const express = require("express");
const router = express.Router();

//===========================================
//                 Dashboard
//===========================================

const {
  getMyProducts,
  deleteMyProduct,
} = require("../controllers/dashboardController");

router.post("/getMyProducts", getMyProducts);
router.post("/deleteMyProduct", deleteMyProduct);

//===========================================
//                 Admin Dashboard
//===========================================

const {
  getAllPendingProducts,
  getAllApprovedProducts,
  getAllRejectedProducts,
  approveProduct,
  rejectProduct,
} = require("../controllers/adminDashboardController");

router.post("/getAllPendingProducts", getAllPendingProducts);
router.post("/getAllApprovedProducts", getAllApprovedProducts);
router.post("/getAllRejectedProducts", getAllRejectedProducts);
router.post("/approveProduct", approveProduct);
router.post("/rejectProduct", rejectProduct);

module.exports = router;
