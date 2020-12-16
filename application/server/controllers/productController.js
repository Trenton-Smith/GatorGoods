// const productModel = require("../models/productModel");
const connection = require("../models/dbconnection");

//===========================================
//              Product Controller
//===========================================

// Create product listing
exports.createProduct = (req, res) => {
  const product_id = 0;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const condition = req.body.condition;
  const location = req.body.location;
  const visible = 0;
  const approval = 0;
  const time = new time();
  const query =
    "INSERT INTO  gatorgoods.Product_Listing(product_id, title, price, description, category, condition, location, time, visible, approval) VALUES ?";
  const values = [
    [
      product_id,
      title,
      price,
      description,
      category,
      condition,
      location,
      time,
      visible,
      approval,
    ],
  ];
  connection.query(query, [values], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });

  // const image_id = 0;
  // const image_blob = req.body.image;
  // const query2 =
  //   "INSERT INTO  gatorgoods.Image(image_id, image_blob, product) VALUES ?";
  // const values2 = [
  //   [
  //     image_id,
  //     image_blob,
  //     product_id,
  //   ],
  // ];
};
