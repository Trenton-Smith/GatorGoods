const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  authenticate,
  logout,
} = require("../controllers/authController");


/**
 * File name: authRouter.js
 * Purpose: This is the router used for user credentials. It connects functions on Navigation.js to authController.js,
 *          which is where we make all the sql queries related to registering new users, logging in existing users,
 *          logging out already logged in users, and authenticating logged in users for tracking cookies and allowing
 *          user access to restricted views e.g. /dashboard.
 * Authors: YG, Trenton
 */

router.post("/signup", signup);
router.post("/login", login);
router.get("/authenticate", authenticate);
router.get("/logout", logout);
module.exports = router;
