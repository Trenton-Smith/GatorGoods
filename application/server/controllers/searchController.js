const connection = require("../models/dbconnection");

//===========================================
//              Search Controller
//===========================================

exports.searchProducts = (req, res) => {
  const searchTerm = req.body.searchTerm;
  const category = req.body.category;
  const homepage = req.body.homepage;

  // 1. get All product
  let query = `SELECT * FROM gatorgoods.Product_Listing WHERE visible="1"`;
  // 2. get products by Category
  if (searchTerm === "" && category !== "" && homepage === "1") {
    // query = `SELECT * FROM gatorgoods.Product_Listing WHERE category="${category}" AND visible="1" LIMIT 0, 4`;
    // search below is first attempts at connecting fk from product_listing to image_blob - pulls but does not render image
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.image_blob
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE
                 category="${category}" AND
                 visible="1"
               LIMIT 0, 4`;
  } else if (searchTerm === "" && category === "" ) {
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.image_blob
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE
                 visible="1"`;
  } else if (searchTerm === "" && category !== "") {
    // query = `SELECT * FROM gatorgoods.Product_Listing WHERE category="${category}" AND visible="1"`;
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.image_blob
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE
                 category="${category}" AND
                 visible="1"`;
    // 3. get products by Category and Title
  } else if (searchTerm !== "" && category !== "") {
    // query = `SELECT * FROM gatorgoods.Product_Listing WHERE title LIKE '%${searchTerm}%' AND category LIKE '%${category}%' AND visible="1"`;
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.image_blob
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE 
                title LIKE '%${searchTerm}%' AND category LIKE '%${category}%' AND visible="1"`;
    // 4. get products by Title
  } else if (searchTerm !== "" && category === "") {
    // query = `SELECT * FROM gatorgoods.Product_Listing WHERE title LIKE '%${searchTerm}%' AND visible="1"
    //          UNION ALL
    //          SELECT * FROM gatorgoods.Product_Listing WHERE title LIKE '%a%' AND visible="1"
    //          AND NOT EXISTS (
    //           SELECT 1
    //           FROM gatorgoods.Product_Listing
    //           WHERE title LIKE '%${searchTerm}%'
    //           )`;
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.image_blob
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE 
                 title LIKE '%${searchTerm}%' AND visible="1" 
               UNION ALL
               SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.image_blob
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
                 WHERE title LIKE '%a%' AND visible="1" 
               AND NOT EXISTS (
                SELECT 1 
                FROM gatorgoods.Product_Listing 
                INNER JOIN
                 gatorgoods.Image
                ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
                WHERE title LIKE '%${searchTerm}%'
                )`;
  }
  connection.query(query, (err, result) => {
    console.log(result);
    if (err) res.send(err);
    // console.log(result);
    else res.send(result);
  });
};
