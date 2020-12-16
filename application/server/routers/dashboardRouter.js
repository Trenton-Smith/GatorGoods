const express = require("express");
const router = express.Router();
const {
  getMyProducts,
  // updateMyProduct, // not currently implemented (not P1 function)
  deleteMyProduct,
  getMyOffers,
  getMyEmail,
} = require("../controllers/dashboardController");


const {
  getAllPendingProducts,
  getAllApprovedProducts,
  getAllRejectedProducts,
  approveProduct,
  rejectProduct,
} = require("../controllers/adminDashboardController");

//===========================================
//                 Dashboard
//===========================================

router.post("/getAllPendingProducts", getAllPendingProducts);
router.post("/getAllApprovedProducts", getAllApprovedProducts);
router.post("/getAllRejectedProducts", getAllRejectedProducts);
router.post("/approveProduct", approveProduct);
router.post("/rejectProduct", rejectProduct);


/**
 * File name: dashboardRouter.js
 * Purpose: This is the router for post requests made from Dashboard.js, Dashboard.js -> DashboardListings.js and
 *          Dashboard.js -> DashboardListingCard.js.
 * Authors: YG, Trenton
 */

router.post("/getMyProducts", getMyProducts); // loads all listings into the dashboard
// router.post("/updateMyProduct", updateMyProduct); // not currently implemented
router.post("/deleteMyProduct", deleteMyProduct); // changes visibility to 0 in db for a listing
router.post("/getMyOffers", getMyOffers); // loads any messages from prospective buyers
router.post("/getMyEmail", getMyEmail); // for rendering email specific to user


module.exports = router;
