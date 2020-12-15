const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/messageController");
// const { getMessages } = require("../controllers/messageController");

//===========================================
//                 Message
//===========================================

router.post("/sendMessage", sendMessage);
// router.post("/getMessages", getMessages);

module.exports = router;
