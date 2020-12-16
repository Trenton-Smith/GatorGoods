import React, { useState, useEffect } from "react";
import {
  Container,
  CardColumns,
  Col,
  Row,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "../../Category.css";
import Filter from "../../Filter";
import Featured from "../../Featured";
import ListingCard from "../../ListingCard";
import axios from "axios";

export default function SearchResults(props) {
  const [productListings, setProductListings] = useState([]);
  console.log(props.location.state.productListings)

  useEffect(() => {
    axios
        .post("/api/search/searchProducts", {
          searchTerm: props.location.state.searchTerm,
          category: props.location.state.category,
        })
        .then((response) => {
          // console.log(response.data);
          setProductListings(response.data);
        });
    // setProductListings(props.location.state.productListings);
    // // props.location.state.productListings.map((productListing) => {
    //   const newImage = new Buffer.from(productListing.image_blob.data).toString(
    //     "base64"
    //   );
    //   productListing.image.data = newImage;
    //   return console.log(productListings);
    // });
  }, [props]);

  function categoryRender() {
    let cat;
    switch (props.location.state.category) {
      case "1":
        cat = "Books";
        break;
      case "2":
        cat = "Furniture";
        break;
      case "3":
        cat = "Electronics";
    }
    return cat;
  }

  return (
    <div>
      <Featured />
      <Container style={{ marginTop: "2rem" }}>
        <Col>
          <Row>
            <Col>
              <h3>
                <span style={{ color: "#e67a00" }}>
                  {categoryRender()} {props.location.state.searchTerm}{" "}
                </span>
                Results
              </h3>
            </Col>
            <Col lg={6}>
              <p>{productListings.length} listings found</p>
            </Col>
            <Col className="text-right">
              <DropdownButton
                id="dropdown-basic-button"
                variant="secondary"
                title="Sort by"
              >
                <Dropdown.Item href="#/action-2">Latest</Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  Price: low to high
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Price: high to low
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col className="filter">
              <Filter />
            </Col>
            <Col lg={9}>
              <CardColumns className="row">
                {productListings.map((productListing, i) => (
                  <ListingCard key={i} {...productListing} />
                ))}
              </CardColumns>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
}
