const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  authenticate,
  logout,
} = require("../controllers/authController");

//===========================================
//                Auth
//===========================================

router.post("/signup", signup);
router.post("/login", login);
router.get("/authenticate", authenticate);
router.post("/logout", logout);
module.exports = router;
