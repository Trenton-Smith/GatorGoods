import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  CardDeck,
  CardColumns,
  CardGroup,
  Col,
  Row,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./Category.css";
import Filter from "./Filter";
import Featured from "./Featured";
import ListingCard from "./ListingCard";

export default function Books() {
  const [bookListings, setBookListings] = useState([]);
  useEffect(() => {
    // const getListings = () => {
        axios
            .post("/api/search/searchProducts", {
              searchTerm: "",
              category: "1", //books
            })
            .then((response) => {
              setBookListings(response.data);
            });
  }, []);

  return (
    <div>
      <Featured />
      <Container style={{ marginTop: "2rem" }}>
        <Col>
          <Row>
            <Col>
              <h2>Books</h2>
            </Col>
            <Col lg={6}>
              <p>{bookListings.length} listings in this category</p>
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
                  {bookListings.map((bookListing, i) => (
                    <ListingCard key={i} {...bookListing} />
                  ))}
              </CardColumns>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
}
