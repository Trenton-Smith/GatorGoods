import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  CardDeck,
  CardColumns,
  Col,
  Row,
  Jumbotron,
  Button,
} from "react-bootstrap";
import "./Home.css";
import Featured from "./Featured";
import ListingCard from "./ListingCard";

export default function Home() {
  const [bookListings, setBookListings] = useState([]);
  const [bookCount, setBookCounts] = useState([]);
  const [furnitureListings, setFurnitureListings] = useState([]);
  const [furnitureCount, setFurnitureCounts] = useState([]);
  const [electronicsListings, setElectronicsListings] = useState([]);
  const [electronicsCount, setElectronicsCounts] = useState([]);
  const [otherListings, setOtherListings] = useState([]);
  const [otherCount, setOtherCounts] = useState([]);

  useEffect(() => {
    // const getListings = () => {
    //___________________ books category and search total ____________________
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "1", //books
        homepage: "1", //limit response to 4
      })
      .then((response) => {
        setBookListings(response.data);
      });
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "1", //books
      })
      .then((response) => {
        setBookCounts(response.data);
      });

    //___________________ furniture category and search total ____________________
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "2", //furniture
        homepage: "1", //limit response to 4
      })
      .then((response) => {
        setFurnitureListings(response.data);
      });
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "2", //furniture
      })
      .then((response) => {
        setFurnitureCounts(response.data);
      });

    //___________________ electronics category and search total ____________________
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "3", //electronics
        homepage: "1", //limit response to 4
      })
      .then((response) => {
        setElectronicsListings(response.data);
      });
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "3", //electronics
      })
      .then((response) => {
        setElectronicsCounts(response.data);
      });

    //___________________ other category and search total ____________________
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "4", //other
        homepage: "1", //limit response to 4
      })
      .then((response) => {
        setOtherListings(response.data);
      });
    axios
      .post("/api/search/searchProducts", {
        searchTerm: "",
        category: "4", //other
      })
      .then((response) => {
        setOtherCounts(response.data);
      });
  }, []);

  return (
    <div>
      <Jumbotron>
        <div className="Jumbotron">
          <Container>
          <h1>Hello, Gators! </h1>
          <p>
            Welcome to the online marketplace specifically designed for
            students, faculty and staff at SFSU.
          </p>
          </Container>
        </div>
      </Jumbotron>
      <Container className="featured-category-container">
        <Featured productListings={bookListings} />
      </Container>
      <Container>
        {/* Books */}
        <Container className="category-title">
          <Row className="text-left">
            <Col lg="auto">
              <h2><a href="/books" className="h2-link">Books</a></h2>
            </Col>
            <Col lg="auto">
              <p style={{ paddingTop: "11.6px" }}>
                {bookCount.length} listings in this category
              </p>
            </Col>
            <Col className="text-right">
              <Button variant="secondary" href="/books">
                See more
              </Button>{" "}
            </Col>
          </Row>
          <Row className="card-container">
            <CardColumns className="row">
              {bookListings.map((bookListing, i) => (
                <ListingCard key={i} {...bookListing} />
              ))}
            </CardColumns>
          </Row>
        </Container>

        {/* Furniture */}
        <Container className="category-title">
          <Row className="category-title" className="text-left">
            <Col lg="auto">
              <h2><a href="/furniture" className="h2-link">Furniture</a></h2>
            </Col>
            <Col lg="auto">
              <p style={{ paddingTop: "11.6px" }}>
                {furnitureCount.length} listings in this category
              </p>
            </Col>
            <Col className="text-right">
              <Button variant="secondary" href="/furniture">
                See more
              </Button>{" "}
            </Col>
          </Row>
          <Row className="card-container">
            <CardColumns className="row">
              {furnitureListings.map((furnitureListing, i) => (
                <ListingCard key={i} {...furnitureListing} />
              ))}
            </CardColumns>
          </Row>
        </Container>

        {/* Electronics */}
        <Container className="category-title">
          <Row className="category-title" className="text-left">
            <Col lg="auto">
              <h2><a href="/electronics" className="h2-link">Electronics</a></h2>
            </Col>
            <Col lg="auto">
              <p style={{ paddingTop: "11.6px" }}>
                {electronicsCount.length} listings in this category
              </p>
            </Col>
            <Col className="text-right">
              <Button variant="secondary" href="/electronics">
                See more
              </Button>{" "}
            </Col>
          </Row>
          <Row className="card-container">
            <CardColumns className="row">
              {electronicsListings.map((electronicsListing, i) => (
                <ListingCard key={i} {...electronicsListing} />
              ))}
            </CardColumns>
          </Row>
        </Container>

        {/* Other */}
        <Container className="category-title">
          <Row className="category-title" className="text-left">
            <Col lg="auto">
              <h2><a href="/other" className="h2-link">Other</a></h2>
            </Col>
            <Col lg="auto">
              <p style={{ paddingTop: "11.6px" }}>
                {otherCount.length} listings in this category
              </p>
            </Col>
            <Col className="text-right">
              <Button variant="secondary" href="/other">
                See more
              </Button>{" "}
            </Col>
          </Row>
          <Row className="card-container">
            <CardColumns className="row">
              {otherListings.map((otherListing, i) => (
                <ListingCard key={i} {...otherListing} />
              ))}
            </CardColumns>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
