const connection = require("../models/dbconnection");


/**
 * File name: dashboardController.js
 * Purpose: This is the controller for any post requests made from a user dashboard. It only has two functions, the
 *          first is to populate the user dashboard with each product listing unique to that user. The second is to
 *          update a specific product listing's visibility to 0, therein "deleting" it for the user. The listing will
 *          still exist in the database however, and will need to be deleted by admins.
 * Authors: YG, Trenton
 */

// loads all product listings in a dashboard unique to a specific user
exports.getMyProducts = (req, res) => {
  const query = `SELECT
                  gatorgoods.Product_Listing.*,
                  gatorgoods.Image.*
                 FROM
                  gatorgoods.Product_Listing
                 INNER JOIN
                  gatorgoods.Image
                 ON
                  gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
                 WHERE
                  user = "${req.body.user_id}" AND visible= "1"`;

  connection.query(query, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// loads all messages (and corresponding data) unique to a specific user
exports.getMyOffers = (req, res) => {
  const query = `SELECT
                  *
                 FROM
                  gatorgoods.Message
                 WHERE
                  seller = "${req.body.user_id}"`;

  connection.query(query, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
}

// used to render a user's email on their unique dashboard view
exports.getMyEmail = (req, res) => {
  const query = `SELECT
                  email
                 FROM
                  gatorgoods.User
                 WHERE
                  user_id = "${req.body.user_id}"`;

  connection.query(query, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
}

// "deletes" a listing from the application *NOTE: the listing remains in the db (for future list/delist functionality)
exports.deleteMyProduct = (req, res) => {
  const product_id = req.body.product_id;
  const query = `UPDATE
                  gatorgoods.Product_Listing
                 SET 
                  visible="0"
                 WHERE 
                  gatorgoods.Product_Listing.product_id = "${product_id}"`;

  connection.query(query, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
