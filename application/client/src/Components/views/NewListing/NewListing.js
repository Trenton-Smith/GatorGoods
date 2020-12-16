import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";


/**
 * File name: NewListing.js
 * Purpose: This is the form where our users can submit their product listing into the database.
 *          It works by taking the form fields and updating their respective values' states on submit,
 *          then appending those values onto a FormData package. It then makes an axios.post request to
 *          productController.js for processing the mysql passed from FormData.
 * Authors: Trenton, YG (functions) | Joy (styling)
 */

// const imageThumbnail = require('image-thumbnail'); // potentially for converting b64 into thumbnails - pkg broke atm

export default function NewListing(props) {

  /*
   The initialInputState lists our variables (minus image which is updated separately) to be passed to the db.
   These are updated by calling setEachEntry() inside handleInputChange() which is itself called during onChange events.
  */
  const initialInputState = {
    title: "",
    description: "",
    category: "",
    price: "",
    condition: "",
    location: "",
  };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const {
    title,
    description,
    category,
    price,
    condition,
    location,
  } = eachEntry;
  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  /*
   Image is used in the same capacity as the variables above, but needs to be handled separately due to its conversion
   from file to b64 data String.
  */
  const [image, setImage] = useState();

  /*
   For testing
  */
  // console.log(title);
  // console.log(image);
  // console.log(category);
  // console.log(price);
  // console.log(condition);
  // console.log(location);
  // console.log(description);

  /*
   Our main variable for transmitting our data package to the backend through an axios.post request sent to
   productController.js.
   All form fields are appended to formData as key/value pairs prior to sending the axios.post request. (below)
  */
  const formData = new FormData();

  const submitListing = () => {
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('location', location);
    formData.append('image', image);

    /*
     Possible implementation for thumbnail conversion if we can get the package to work.
    */
    // let options = { percentage: 25}
    // try {
    //   const thumbnail = imageThumbnail(formData.get('image'), options);
    //   console.log(thumbnail);
    //   formData.append('thumbnail', thumbnail);
    // } catch (err) {
    //   console.error(err);
    // }

    /*
     The following is where we transmit our data package to the backend via /api/product/createProduct which is loc. in
     productController.js.
     This should contain all our formData key/value pairs. We will parse these values in productController before
     uploading to the db.
    */
    axios
      .post("/api/product/createProduct", {
        body: {
          title: formData.get('title'),
          description: formData.get('description'),
          price: formData.get('price'),
          category: formData.get('category'),
          condition: formData.get('condition'),
          location: formData.get('location'),
        },
        data: {
          headers: { 'Content-Type': `multipart/form-data; boundary=${image.boundary}` },
          file: formData.get('image'),
          // thumbnail: formData.get('thumbnail'), // not currently implemented, but we would include thumbnail imgs here
        }
      })
      .then(() => {
        alert("successfully created.");
      });
  };

  if (props.admin === "1") {
    return <Redirect to='/404' />
  } else {
    return (
      <div style={{ marginTop: "50px" }}>
        <Container style={{ width: "800px" }}>
          <h3>Create a Listing</h3>
          <br />

          {/*<Form method="POST" enctype="multipart/form-data">*/} {/*FOR FIREFOX ONLY: firefox will crash w/o this format*/}
          <Form>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Image"
                name="image"
                onChange={(e) => {
                  console.log(e.target.files[0]); // picking our file
                  let reader = new FileReader(); // used to read our new file as data
                  reader.readAsDataURL(e.target.files[0]); // reading the file
                  reader.onloadend = function () { // after finished read, setImage()
                    setImage(
                      reader.result.replace(/^data:.+;base64,/, '') // update 'image' as a string of b64 data
                    );
                  };
                }}
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
                <option>Choose</option>
                <option value={"1"}>Books</option>
                <option value={"2"}>Furniture</option>
                <option value={"3"}>Electronics</option>
                <option value={"4"}>Other</option>
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
              <InputGroup className="mb-2">
                <Form.Control
                  as="select"
                  name="condition"
                  value={condition}
                  onChange={handleInputChange}
                >
                  <option>Choose</option>
                  <option value={"1"}>Like New</option>
                  <option value={"2"}>Very Good</option>
                  <option value={"3"}>Good</option>
                  <option value={"4"}>Acceptable</option>
                </Form.Control>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Transaction Location</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  as="select"
                  name="location"
                  value={location}
                  onChange={handleInputChange}
                >
                  <option>Choose</option>
                  <option value={"Library"}>Library</option>
                  <option value={"The Village"}>The Village</option>
                  <option value={"C. Chavez"}>C. Chavez</option>
                  <option value={"Thornton Hall"}>Thornton Hall</option>
                </Form.Control>
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
}
