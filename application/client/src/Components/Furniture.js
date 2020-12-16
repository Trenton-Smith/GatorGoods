import React, {useEffect, useState} from "react";
import {
    Container,
    CardDeck,
    CardGroup,
    Card,
    Col,
    Row,
    DropdownButton,
    Dropdown,
    Button,
    Form, CardColumns
} from "react-bootstrap";
import "./Category.css"
import Filter from "./Filter";
import Featured from "./Featured"
import ListingCard from "./ListingCard"
import axios from "axios";

export default function Furniture () {
    const [furnitureListings, setFurnitureListings] = useState([]);
    useEffect(() => {
        // const getListings = () => {
        axios
            .post("/api/search/searchProducts", {
                searchTerm: "",
                category: "2", //furniture
            })
            .then((response) => {
                setFurnitureListings(response.data);
            });
    }, []);

    return (
        <div>
            <Featured />
            <Container style={{ marginTop: "2rem" }}>
                <Col>
                    <Row>
                        <Col>
                            <h2>Furniture</h2>
                        </Col>
                        <Col lg={6}>
                            <p>{furnitureListings.length} listings in this category</p>
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
                                    {furnitureListings.map((furnitureListing, i) => (
                                        <ListingCard key={i} {...furnitureListing} />
                                    ))}
                            </CardColumns>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}
