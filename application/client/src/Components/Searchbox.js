import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";


/**
 * File name: Searchbox.js
 * Purpose: This is the searchbar component which is rendered inside the navbar (Navigation.js). It is not itself
 *          connected to the database, as it only needs to push values to the /searchresults view, which then takes those
 *          values and makes an initial post request prior to rendering.
 * Authors: YG, Trenton (functions) | Joy (styling)
 */

export default function Searchbox() {
  // initial state which is updated and sent to /searchresults through history.push
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const history = useHistory(); // pushed to /searchresults on user search

  // updated on user category selection from dropdown
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  // updated from user text entry
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // This is where we redirect to /searchresults with any state the user has entered (if any)
  const onSearch = () => {
    history.push("/searchresults", {
      // productListings: productListings,
      category: category.valueOf(),
      searchTerm: searchTerm,
    });
  };

  return (
    <div>
      {/* Search Bar */}
      <InputGroup className="mx-auto">
        <Form.Group style={{ width: "8rem" }}>
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value={""}>Category</option>
            <option value={"1"}>Books</option>
            <option value={"2"}>Furniture</option>
            <option value={"3"}>Electronics</option>
            <option value={"4"}>Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group inline style={{ width: "25rem" }}>
          <FormControl
            placeholder="Search.."
            className="mr-sm-2"
            maxLength="40"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={onSearch}>
              Search
            </Button>
          </InputGroup.Append>
        </Form.Group>
      </InputGroup>
    </div>
  );
}
