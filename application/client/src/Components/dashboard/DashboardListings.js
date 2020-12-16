import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import DashboardListingCard from "./DashboardListingCard";
import axios from "axios";

export default function DashboardListings(props) {
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

  return (
    <CardDeck style={{ padding: "2.5rem" }}>
      {productListings.map((productListing, i) => (
        <DashboardListingCard key={i} {...productListing} />
      ))}
    </CardDeck>
  );
}
