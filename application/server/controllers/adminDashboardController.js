const connection = require("../models/dbconnection");
//===========================================
//        Admin Dashboard Controller
//===========================================

exports.getAllPendingProducts = (req, res) => {
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
                  visible="0" AND approval="0"`;

  connection.query(query, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.getAllApprovedProducts = (req, res) => {
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
                    visible="1" AND approval="1"`;
  
    connection.query(query, (err, result) => {
      // console.log(result);
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
};

exports.getAllRejectedProducts = (req, res) => {
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
                    visible="0" AND approval="1"`;
  
    connection.query(query, (err, result) => {
      // console.log(result);
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
};

exports.approveProduct = (req, res) => {
    const query = `UPDATE gatorgoods.Product_Listing
    SET visible=1, approval=1
    WHERE product_id=${req.body.product_id}`;
  
    connection.query(query, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };

  exports.rejectProduct = (req, res) => {
    const query = `UPDATE gatorgoods.Product_Listing
    SET visible=0, approval=1
    WHERE product_id=${req.body.product_id}`;
  
    connection.query(query, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };