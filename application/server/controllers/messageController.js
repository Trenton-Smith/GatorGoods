const connection = require("../models/dbconnection");


/**
 * File name: messageController.js
 * Purpose: This is used to enter messages into the db. It is only accessible by users who are registered AND logged in.
 *          It is called from ProductListing.js inside the message modal logic.
 * Author: YG, Trenton (functions)
 */

exports.sendMessage = (req, res) => {
  let query = `INSERT INTO gatorgoods.Message SET ?`;
  let value = {
    product: req.body.product,
    title: req.body.title,
    message: req.body.message,
    contact: req.body.contact,
    buyer: req.session.user,
    seller: req.body.seller,
  };

  connection.query(query, value, function (err, result) {
    if (err) {
      connection.rollback(function () {
        console.log(err);
        throw err;
      });
    } else {
      res.json({
        success: true,
      });
      console.log("message was sent");
    }
  });
};
