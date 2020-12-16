import React, { useState } from "react";
import { Form, Row, Col, Button, Container, InputGroup } from "react-bootstrap";
// import Dropzone from 'react-dropzone';
import axios from "axios";

export default function NewListing(props) {
  const initialInputState = {
    title: "",
    description: "",
    category: "",
    image: "",
    price: "",
  };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const {
    title,
    description,
    category,
    image,
    price,
    condition,
    location,
  } = eachEntry;
  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  console.log(image);
  console.log(condition);
  console.log(location);

  const submitListing = () => {
    axios
      .post("/api/product/createProduct", {
        title: title,
        description: description,
        price: price,
        category: category,
        image: image,
        condition: condition,
        location: location,
      })
      .then(() => {
        alert("successfully created.");
      });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Container style={{ width: "800px" }}>
        <h3>Create a Listing</h3>
        <br />

        <Form>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Image"
              name="image"
              value={image}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              name="title"
              maxLength="30"
              value={title}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Please limit to 30 characters.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={category}
              onChange={handleInputChange}
            >
              <option value={""}>Choose</option>
              <option value={"1"}>Book</option>
              <option value={"2"}>Furniture</option>
              <option value={"3"}>Electronic</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                  placeholder="10.00"
                  name="price"
                  maxLength="10"
                  value={price}
                  onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Condition
            </Form.Label>
            {/*<Form.Control onChange={handleInputChange} value={condition} />*/}
            <InputGroup className="mb-2">
              <Form.Check
                  inline
                  type="radio"
                  label="Like New"
                  name="formHorizontalRadios"
                  id="condition-like-new"
                  value="Like New"
              />
              <Form.Check
                  inline
                  type="radio"
                  label="Very Good"
                  name="formHorizontalRadios"
                  id="condition-very-good"
                  value="Very Good"
              />
              <Form.Check
                  inline
                  type="radio"
                  label="Good"
                  name="formHorizontalRadios"
                  id="condition-good"
                  value="Good"
              />
              <Form.Check
                  inline
                  type="radio"
                  label="Acceptable"
                  name="formHorizontalRadios"
                  id="condition-acceptable"
                  value="Acceptable"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            {/*<Form.Control onChange={handleInputChange()} value={location}/>*/}
            <Form.Label>Transaction Location</Form.Label>
            <InputGroup className="mb-2">
              <Form.Check value="Library" inline label="Library" />
              <Form.Check value="The Village" inline label="The Village" />
              <Form.Check value="C. Chavez" inline label="C. Chavez" />
              <Form.Check value="Thornton Hall" inline label="Thornton Hall" />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Row style={{ marginTop: "2rem" }}>
            <Col lg={2}>
              <Button
                variant="secondary"
                className="btn-lg"
                type="submit"
                href="/"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                className="btn-lg"
                type="submit"
                onClick={submitListing}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
