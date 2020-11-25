const connection = require("../models/dbconnection");
//===========================================
//        Admin Dashboard Controller
//===========================================

exports.getAllPendingProducts = (req, res) => {
  const query = `SELECT * FROM gatorgoods.Product_Listing WHERE visible=0`;

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
    const query = `SELECT * FROM gatorgoods.Product_Listing WHERE visible=1 AND approval=1`;
  
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
    const query = `SELECT * FROM gatorgoods.Product_Listing WHERE approval=0`;
  
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
    const query = `SELECT * FROM gatorgoods.Product_Listing WHERE visible=1`;
  
    connection.query(query, (err, result) => {
      // console.log(result);
      if (err) {
        // res.json({
        //   sucess: false,
        //   message: "Something went wrong. Please try again.",
        // });
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };

  exports.rejectProduct = (req, res) => {
    const query = `SELECT * FROM gatorgoods.Product_Listing WHERE visible=1`;
  
    connection.query(query, (err, result) => {
      // console.log(result);
      if (err) {
        // res.json({
        //   sucess: false,
        //   message: "Something went wrong. Please try again.",
        // });
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };