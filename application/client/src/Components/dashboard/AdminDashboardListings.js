import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import AdminDashboardListingCard from "./AdminDashboardListingCard";
import axios from "axios";

export default function AdminDashboardListings(props) {
    let endpoint = "getAllPendingProducts";
    switch(props.status) {
        case "pending":
            endpoint = "getAllPendingProducts";
          break;
        case "approved":
            endpoint = "getAllApprovedProducts";
          break;
        case "rejected":
            endpoint = "getAllRejectedProducts";
          break;
        default:
            endpoint = "getAllPendingProducts";
      }
  const [productListings, setProductListings] = useState([]);
  useEffect(() => {
    axios
      .post(`/api/dashboard/${endpoint}`, {
      })
      .then((response) => {
        setProductListings(response.data);
      });
  }, [props]);

  return (
    <CardDeck style={{ padding: "2.5rem" }}>
      {productListings.map((productListing, i) => (
        <AdminDashboardListingCard key={i} {...productListing} />
      ))}
    </CardDeck>
  );
}