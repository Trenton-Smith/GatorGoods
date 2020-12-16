const express = require("express");
const router = express.Router();
const {
  getMyProducts,
  //   updateMyProduct,
  //   deleteMyProduct,
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

module.exports = router;
