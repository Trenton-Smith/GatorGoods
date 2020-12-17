const connection = require("../models/dbconnection");


/**
 * File name: sortController.js
 * Purpose: This is the controller for sort selections made by the user on either the category views, or the search
 *          results view. The sortOption is received from the axios.post request, and is initially given a value of 1,2,
 *          or 3 dependent on a user's selection. Note: We cannot inject the querySort variable into the final sort
 *          query due to the use of a UNION ALL condition; therefore, we need to manually type the sort option.
 * Authors: YG, Trenton
 */

exports.sortProducts = (req, res) => {

    const searchTerm = req.body.searchTerm; // passed from search bar (user enters)
    const category = req.body.category; // passed from search bar or banner selections (user selects)
    const sortOption = req.body.sortOption; // passed from sort dropdown menu (user selects)

    // console.log("******");
    // console.log(req.body);

    let query;
    let querySort;
    if(sortOption === 1) {
        querySort = `ORDER BY gatorgoods.Product_Listing.condition ASC`;
    }else if(sortOption === 2){
        querySort = `ORDER BY gatorgoods.Product_Listing.price ASC`;
    }else if(sortOption === 3){
        querySort = `ORDER BY gatorgoods.Product_Listing.price DESC`;
    }
    // console.log(querySort);

      /*
       1. DEFAULT SEARCH - not needed for sorting purposes
       2. HOME VIEW - not needed for sorting purposes
      */
    // 3. EMPTY SEARCH - user HAS NOT selected a category and entered nothing into the search bar -> return all listings
    if (searchTerm === "" && category === "" ) {
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
                 visible="1"
                 ${querySort}`;
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
                 visible="1"
                 ${querySort}`;
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
               OR description LIKE '%${searchTerm}%' AND category LIKE '%${category}%' AND visible="1" ${querySort}`;
    } // 6. TEXT SEARCH - user HAS NOT selected a category but HAS entered text -> return ANY listings matching text - if
      //                  no matches, return SAMPLING (default matches any listings with 'a' in title)
      //                  *Note: This query needs to be performed with explicit declaration of the ORDER BY call, as we
      //                  cannot inject a variable here due to the UNION ALL condition
    else if (searchTerm !== "" && category === "") {
        if(sortOption === 1) {
            query = `SELECT
                 pass1.*
               FROM ( 
                   SELECT
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
                 OR description LIKE '%${searchTerm}%' AND visible="1") AS pass1          
               UNION ALL
               SELECT
                 pass2.*
               FROM (
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
                WHERE title LIKE '%${searchTerm}%' AND visible="1"
                OR description LIKE '%${searchTerm}%' AND visible="1"
                )) AS pass2 ORDER BY 5 ASC`;
        }else if (sortOption===2){
            query = `SELECT
                 pass1.*
               FROM ( 
                   SELECT
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
                 OR description LIKE '%${searchTerm}%' AND visible="1") AS pass1          
               UNION ALL
               SELECT
                 pass2.*
               FROM (
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
                WHERE title LIKE '%${searchTerm}%' AND visible="1"
                OR description LIKE '%${searchTerm}%' AND visible="1"
                )) AS pass2 ORDER BY 3 ASC`;
        }else if (sortOption===3) {
            query = `SELECT
                 pass1.*
               FROM ( 
                   SELECT
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
                 OR description LIKE '%${searchTerm}%' AND visible="1") AS pass1          
               UNION ALL
               SELECT
                 pass2.*
               FROM (
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
                WHERE title LIKE '%${searchTerm}%' AND visible="1"
                OR description LIKE '%${searchTerm}%' AND visible="1"
                )) AS pass2 ORDER BY 3 DESC`;
        }
    }

    connection.query(query, (err, result) => {
        console.log("WE MADE IT THIS FAR");
        console.log(result);
        if (err) res.send(err);
        // console.log(result);
        else res.send(result);
    });
};