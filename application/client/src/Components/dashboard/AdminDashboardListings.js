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

  const reload = () => {
    props.refresh();
}

  useEffect(() => {
    axios
      .post(`/api/dashboard/${endpoint}`, {
      })
      .then((response) => {
        setProductListings(response.data);
      });
    console.log('I fire once');
  }, [props]);

  return (
    <CardDeck style={{ padding: "2.5rem" }} className="admin-wrapper">
      {productListings.map((productListing, i) => (
        <AdminDashboardListingCard key={i} status={props.status} reload={reload} {...productListing} />
      ))}
    </CardDeck>
  );
}