import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import DashboardListingCard from "./DashboardListingCard";
import axios from "axios";

/**
 * File name: DashboardListings.js
 * Purpose: This component is called in Dashboard.js in order to populate the product listings of a specific user in
 *          that user's dashboard. It is connected to the db through a post request which only pulls products that
 *          belong to the user and have a visibility of 1.
 * Author: YG, Trenton
 */

export default function DashboardListings(props) {
  /*
   State and method for updating product listings
  */
  const [productListings, setProductListings] = useState([]);
  useEffect(() => {
    axios
      .post("/api/dashboard/getMyProducts", {
        user_id: props.user,
      })
      .then((response) => {
        setProductListings(response.data);
      });
  }, [props]);

  /*
   Returns a prebuilt CardDeck comprised of the listings returned above. The deck will be rendered in Dashboard.js.
  */
  return (
    <div>
      <h4 style={{ paddingTop: "3rem", paddingLeft: "3rem" }}>
        You have {productListings.length} listings
      </h4>
      <CardDeck style={{ padding: "2.5rem" }}>
        {productListings.map((productListing, i) => (
          <DashboardListingCard key={i} {...productListing} />
        ))}
      </CardDeck>
    </div>
  );
}
