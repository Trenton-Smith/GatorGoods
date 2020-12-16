import React, {useEffect, useState} from "react";
import {
    Container,
    Col,
    Row,
    DropdownButton,
    Dropdown,
    CardColumns,
} from "react-bootstrap";
import "./Category.css"
import ListingCard from "./ListingCard"
import axios from "axios";
// import Filter from "./Filter"; // legacy feature
// import Featured from "./Featured" // legacy feature


/**
 * File name: Electronics.js
 * Purpose: Books.js, Furniture.js, Electronics.js, and Other.js are all implemented the same way. They are views
 *          specific to each category in the db (current as of 12/10/2020), and are navigated to by a user's selection
 *          of a "featured" category (NOT the result of a searchbar search). They are implemented by making an initial
 *          post request prior to loading, rendering all the visible product listings matching their specific category.
 *          On a sort request from the user, the product listings are repopulated by a separate post request, and then
 *          the window is reloaded with the new listings. This means that should any listings be deleted or added to the
 *          db (matching the category of the view), then the resulting listings will be loaded with those changes.
 *
 * Authors: YG, Trenton (functions) | Joy (styling)
 */

export default function Electronics() {
    const [electronicsListings, setElectronicsListings] = useState([]); // state for populating listing cards

    // This is the initial post request which pulls data from the database prior to the view loading
    useEffect(() => {
        axios
            .post("/api/search/searchProducts", {
                searchTerm: "",
                category: "3", //electronics
            })
            .then((response) => {
                setElectronicsListings(response.data);
            });
    }, []);


    const [sortOption, setSortOption] = useState() // state for sorting options - user selected

    // This is the post request for sorting listings *Note: Resultant listings are returned from the database
    // ALREADY ordered. No re-ordering is done on the client-side
    const handleSortOption = (sort) => {
        axios
            .post("/api/search/sortProducts", {
                searchTerm: "",
                category: 3,
                sortOption: sort
            })
            .then((response) => {
                // console.log(response.data);
                setElectronicsListings(response.data);
            });
    }


    return (
        <div>
            {/*<Featured />*/}
            <Container style={{ marginTop: "2rem" }}>
                <Col>
                    <Row>
                        <Col>
                            <h2>Electronics</h2>
                        </Col>
                        <Col md="auto" style={{paddingTop: "7px"}}>
                            <p>{electronicsListings.length} listings found</p>
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
                            {electronicsListings.map((electronicsListing, i) => (
                                <ListingCard key={i} {...electronicsListing} />
                            ))}
                        </CardColumns>
                    </Row>
                    </Container>
                </Col>
            </Container>
        </div>
    );
}