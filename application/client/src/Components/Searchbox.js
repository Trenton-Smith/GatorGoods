import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Jumbotron,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";



export default function Searchbox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [productListings, setProductListings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getListings = () => {
      axios
        .post("/api/search/searchProducts", {
          searchTerm: searchTerm,
          category: category,
        })
        .then((response) => {
          // console.log(response.data);
          setProductListings(response.data);
        });
    };
    getListings();
    // console.log(searchTerm);
  }, [searchTerm, category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // onSearch -> redirect to result page
  const onSearch = () => {
    history.push("/test", {
      productListings: productListings,
      category: category,
      searchTerm: searchTerm,
    });
  };

  return (
    <div>
      {/* Search Bar */}
      <InputGroup className="mx-auto" >
        <Form.Group style={{ width: "8rem" }}>
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option>Category</option>
            <option>Book</option>
            <option>Furniture</option>
            <option>Electronic</option>
          </Form.Control>
        </Form.Group>

        <Form.Group inline style={{ width: "20rem" }}>
          <FormControl
            placeholder="Search.."
            className="mr-sm-2"
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
