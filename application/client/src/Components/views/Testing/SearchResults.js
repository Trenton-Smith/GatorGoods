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
import ListingCard from "../../ListingCard";
import axios from "axios";
import Filter from "../../Filter"; // legacy feature
import Featured from "../../Featured"; // legacy feature

/**
 * File name: SearchResults.js
 * Purpose: This is the resultant view after a user uses the searchbar (Searchbox.js) to search for products. It is
 *          connected to both the searchController and sortController, the former being for loading and reloading
 *          product listings on page loads, and the latter being for sorting those results. It should be noted that on
 *          sorts, the product listings are actually repopulated from a new query, and are not the initial cards on page
 *          load. This means that any addition or negation from the database during the time between load and sort call
 *          will include the changed results.
 * Authors: YG, Trenton (functions) | Joy (styling)
 */

export default function SearchResults(props) {
  const [productListings, setProductListings] = useState([]); // state for rendering product listings
  // console.log(props.location.state.productListings)
  const [loading, setLoading] = useState(true);
  /*
   This is called on first load of the page, as well as subsequent reloads after sorting. Unlike handleSortOption which
   is called on user selection, useEffect is triggered automatically prior to loading the rendering the page so that we
   can render the product listings based on whatever searchTerm and category were given by the user, if any.
   */
  useEffect(() => {
    setSearchTerm(props.location.state.searchTerm);
    setCategory(props.location.state.category);
    axios
      .post("/api/search/searchProducts", {
        searchTerm: props.location.state.searchTerm,
        category: props.location.state.category,
      })
      .then((response) => {
        // console.log(response.data);
        setProductListings(response.data);
        setLoading(false);
      });
  }, [props]);

  /*
   Our state for making the handleSortOption calls on sort.
  */
  const [sortOption, setSortOption] = useState();
  const [searchTerm, setSearchTerm] = useState(props.location.state.searchTerm);
  const [category, setCategory] = useState(props.location.state.category);

  /*
   This function is called after a user selects a sort option from the dropdown menu. We pass the pre-existing params
   for the searchTerm and category which we received on first load of the page (since we arrived here through the use of
   the searchbar), then pass the sort option after setting its state based on the dropdown selection by the user.
  */
  const handleSortOption = (sort) => {
    axios
      .post("/api/search/sortProducts", {
        searchTerm: searchTerm,
        category: category,
        sortOption: sort,
      })
      .then((response) => {
        // console.log(response.data);
        setProductListings(response.data);
      });
  };

  /*
   This is used to render the name of the category specific to the user's search.
  */
  function categoryRender() {
    let cat;
    switch (category) {
      case "1":
        cat = "Books";
        break;
      case "2":
        cat = "Furniture";
        break;
      case "3":
        cat = "Electronics";
        break;
      case "4":
        cat = "Other";
    }
    return cat;
  }

  return (
    <div>
      {/*<Featured />*/}
      <Container style={{ marginTop: "2rem" }}>
        <Col>
          <Row>
            <Col>
              <h2>
                Results for &nbsp;
                <span style={{ color: "#6610f2", fontWeight: "bold" }}>
                  "{categoryRender()} {searchTerm} "
                </span>
              </h2>
            </Col>
            <Col md="auto" style={{ paddingTop: "7px" }}>
              <p>{productListings.length} listings found</p>
            </Col>
            <Col xs lg="2" style={{ marginRight: "-4.3rem" }}>
              <DropdownButton
                id="dropdown-basic-button"
                variant="secondary"
                title="Sort by"
                key={sortOption}
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    setSortOption("1");
                    handleSortOption(1);
                  }}
                >
                  Condition: best to worst
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    setSortOption("2");
                    handleSortOption(2);
                  }}
                >
                  Price: low to high
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => {
                    setSortOption("3");
                    handleSortOption(3);
                  }}
                >
                  Price: high to low
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Container>
            {!loading ? (
              <Row>
                <CardColumns className="row" style={{ margin: "1.5rem" }}>
                  {productListings.map((productListing, i) => (
                    <ListingCard key={i} {...productListing} />
                  ))}
                </CardColumns>
              </Row>
            ) : (
              <Row className="justify-content-md-center">
                <h2 style={{ margin: "5rem" }}>Loading...</h2>
              </Row>
            )}
          </Container>
        </Col>
      </Container>
    </div>
  );
}
