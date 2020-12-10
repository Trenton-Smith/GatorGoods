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
    Form,
    CardColumns
} from "react-bootstrap";
import "./Category.css"
import Filter from "./Filter";
import Featured from "./Featured"
import ListingCard from "./ListingCard"
import axios from "axios";

export default function Other() {
    const [otherListings, setOtherListings] = useState([]);
    useEffect(() => {
        // const getListings = () => {
        axios
            .post("/api/search/searchProducts", {
                searchTerm: "",
                category: "4", //other
            })
            .then((response) => {
                setOtherListings(response.data);
            });
    }, []);

    const [sortOption, setSortOption] = useState()
    const handleSortOption = (sort) => {
        axios
            .post("/api/search/sortProducts", {
                searchTerm: "",
                category: 4,
                // searchTerm: props.location.state.searchTerm,
                // category: props.location.state.category,
                sortOption: sort
            })
            .then((response) => {
                // console.log(response.data);
                setOtherListings(response.data);
            });
    }

    return (
        <div>
            {/*<Featured />*/}
            <Container style={{ marginTop: "2rem" }}>
                <Col>
                    <Row>
                        <Col>
                            <h2>Other</h2>
                        </Col>
                        <Col md="auto" style={{paddingTop: "7px"}}>
                            <p>{otherListings.length} listings found</p>
                        </Col>
                        <Col xs lg="2" style={{marginRight: "-4.3rem"}}>
                            <DropdownButton
                                id="dropdown-basic-button"
                                variant="secondary"
                                title="Sort by"
                                key={sortOption}
                            >
                                <Dropdown.Item eventKey="1" onClick={() => {setSortOption('1');handleSortOption(1)}}>
                                    Condition: best to worst
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => {setSortOption('2');handleSortOption(2)}}>
                                    Price: low to high
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={() => {setSortOption('3');handleSortOption(3)}}>
                                    Price: high to low
                                </Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Container>
                        <Row>
                            <CardColumns className="row" style={{margin: "1.5rem"}}>
                                {otherListings.map((otherListing, i) => (
                                    <ListingCard key={i} {...otherListing} />
                                ))}
                            </CardColumns>
                        </Row>
                    </Container>
                </Col>
            </Container>
        </div>
    );
}