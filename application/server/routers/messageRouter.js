const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/messageController");
// const { getMessages } = require("../controllers/messageController"); // future implementation

/**
 * File name: messageRouter.js
 * Purpose: This is the router for post requests made from ProductListings.js
 *          for sending messages to seller of specific product.
 * Authors: YG
 */
router.post("/sendMessage", sendMessage);
// router.post("/getMessages", getMessages); // future implementation

module.exports = router;
