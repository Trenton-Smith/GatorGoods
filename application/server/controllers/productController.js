const connection = require("../models/dbconnection");


/**
 * File name: productController.js
 * Purpose: This is the controller for submitting formData variables (via NewListing.js) into the database through mysql
 *          queries. We first parse the key/value values from formData -> received as req -> contained in req.body.body
 *          for the title, description, price, category, condition, and location; req.body.data contains image and
 *          thumbnail (if implemented). We then save those values to a package (value) to be sent to the db in our
 *          transaction (a multi-step chain of queries).
 * Authors: Trenton, YG
 */

exports.createProduct = (req, res) => {
  /*
   For testing
  */
  // console.log(req.body);
  // console.log(req.body.body);
  // console.log(req.body.body.title);
  // console.log(req.body.data);
  // console.log(req.body.data.file);

  /*
   Parsed values from NewListing.js : formData (received as req) to be sent to the database.
   Note: visible and approval are defaulted as 0 so that the newly created listing can be vetted by admins before
   posting to the site.
  */
  const title = req.body.body.title;
  const description = req.body.body.description;
  const price = req.body.body.price;
  const category = req.body.body.category;
  const condition = req.body.body.condition;
  const location = req.body.body.location;
  const image = req.body.data.file; // contains the base64 string
  // const thumbnail = req.body.data.thumbnail; //not currently implemented
  const visible = 0;
  const approval = 0;

  /*
   In order to create a listing, the user must be registered AND logged in, which means we can access that specific user
   by req.session.user which grabs their ID. We then use this ID value to tie the formData values to that specific user.
  */
  const user = req.session.user;


  /*
   sql and value are the first query we make to the db with our formData values. We do NOT send image (or thumbnail if
   implemented) here because we first need to return the product_id of the newly created product_listing (see db schema
   for details). The ID is then used as a foreign key to tie the image (located in a different table) to the
   product_listing.
  */
  const sql =
      `INSERT INTO gatorgoods.Product_Listing SET ?`;

  const value = {
    title: title, price: price, description: description,
    condition: condition, category: category, user: user, location: location, visible: visible, approval: approval
  };

  /*
   sql2 and sql3 are implemented AFTER sql in our transaction for saving the image after the product_listing has been
   created.
  */
  const sql2 =
      `SELECT product_id FROM gatorgoods.Product_Listing WHERE title="${title}" AND user="${user}"`;

  const sql3 =
      `INSERT INTO gatorgoods.Image SET ?`;

  /*
   This is the start of the multi-query transaction to our database. First we submit the formData values, then receive
   the corresponding product_id, and then finish the transaction by storing the image tied by that ID.
   Note: 'connection' is pulled from dbconnection.js and connects the app to the database server. We can implement it
   here to make queries and other functions like this.
  */
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query(sql, value, function(err, result) { // first query - input formData fields (minus image) into db
      if (err) {
        connection.rollback(function() {
          console.log(err);
          throw err;
        });
      }

      connection.query(sql2, function(err, result2) { // second query - pull newly created product_listing : product_id
        if (err) {
          connection.rollback(function() {
            console.log(err);
            throw err;
          });
        }

        /*
         Before submitting the next query, we need to take the image and product_id which is contained in result2[0], and
         create a new package for submitting (value3).
         Note: There is no value2 because sql2 is not storing any data in the db.
        */
        let value3 = {image_blob: image, product: result2[0].product_id}
        // let value3 = {image_blob: image, product: result2[0].product_id, image_thumb: thumbnail} // if impl. thumbnail
        connection.query(sql3, value3, function(err, result3) { // third query - store image and product_id into db
          if (err) {
            connection.rollback(function() {
              console.log(err);
              throw err;
            });
          }

        connection.commit(function(err) { // final commit of entire transaction - if errors, void entire transaction by rollback
          if (err) {
            connection.rollback(function() {
              console.log(err);
              throw err;
            });
          } else {
            res.json({
              success: true,
              message: "Your post was made! Please note that it may take up to 24 hours to be reviewed."
            });
            console.log('Transaction Complete.');
          }
          // connection.end(); // ! ! DO NOT CLOSE CONNECTION ! ! -crashes app as we need our connection to remain open at all times
        });
        });
      });
    });
  }
)};
// }