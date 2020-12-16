const connection = require("../models/dbconnection");
//===========================================
//        Dashboard Controller
//===========================================

exports.getMyProducts = (req, res) => {
  const query = `SELECT * FROM gatorgoods.Product_Listing WHERE user= ${req.body.user_id}`;

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
// exports.updataeMyProducts = (req, res) => {};
// exports.deleteMyProducts = (req, res) => {};
