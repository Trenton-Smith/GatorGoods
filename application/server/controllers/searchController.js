const connection = require("../models/dbconnection");


/**
 * File name: searchController.js
 * Purpose: This is where we house all the mysql queries related to populating our app with data from the db. Because we
 *          are using multiple tables connected by foreign keys, we need to use INNER JOIN to be able to pull columns
 *          from each. In 2. we set LIMIT to 4 because we are sampling listings for the home view. For each, we ensure
 *          visible="1" because initially listings are defaulted with visibility="0" in order to NOT pull from the db
 *          until admins have performed proper vetting, in which point they will either set to 1 and allow the post,
 *          keep at 0 until further inspection, or delete the listing's row altogether.
 * Authors: Trenton
 */

exports.searchProducts = (req, res) => {

  const searchTerm = req.body.searchTerm; // passed from search bar (user enters)
  const category = req.body.category; // passed from search bar or banner selections (user selects)
  const homepage = req.body.homepage; // used as a flag for home view rendering limitations in search 2. (no user input)

  // 1. DEFAULT - select every product listing from the database - does NOT pull corresponding images and thus is NOT
  //              used for populating product listing cards
  let query = `SELECT * FROM gatorgoods.Product_Listing WHERE visible="1"`;

  // 2. HOME VIEW - populates 4 product listings from each category for display on the home view
  if (searchTerm === "" && category !== "" && homepage === "1") {
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.*
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
  } // 3. EMPTY SEARCH - user HAS NOT selected a category and entered nothing into the search bar -> return all listings
  else if (searchTerm === "" && category === "" ) {
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.*
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE
                 visible="1"`;
  } // 4. CATEGORY SEARCH - user HAS selected a category but not entered any text into the searchbar -> return category
  else if (searchTerm === "" && category !== "") {
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.*
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE
                 category="${category}" AND
                 visible="1"`;
  } // 5. CATEGORY & TEXT SEARCH - user HAS selected a category and HAS entered text into the searchbar -> return ONLY
    //                             listings matching the text in that specific category - if no matches, return NONE
  else if (searchTerm !== "" && category !== "") {
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.*
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE 
                title LIKE '%${searchTerm}%' AND category LIKE '%${category}%' AND visible="1"
               OR description LIKE '%${searchTerm}%' AND category LIKE '%${category}%' AND visible="1"`
  } // 6. TEXT SEARCH - user HAS NOT selected a category but HAS entered text -> return ANY listings matching text - if
    //                  no matches, return SAMPLING (default matches any listings with 'a' in title)
  else if (searchTerm !== "" && category === "") {
    query = `SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.*
               FROM
                 gatorgoods.Product_Listing
               INNER JOIN
                 gatorgoods.Image
               ON
                 gatorgoods.Product_Listing.product_id=gatorgoods.Image.product
               WHERE 
                 title LIKE '%${searchTerm}%' AND visible="1"
                 OR description LIKE '%${searchTerm}%' AND visible="1"
               UNION ALL
               SELECT
                 gatorgoods.Product_Listing.*,
                 gatorgoods.Image.*
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
                OR description LIKE '%${searchTerm}%'
                )`;
  }
  connection.query(query, (err, result) => {
    console.log(result);
    if (err) res.send(err);
    // console.log(result);
    else res.send(result);
  });
};
