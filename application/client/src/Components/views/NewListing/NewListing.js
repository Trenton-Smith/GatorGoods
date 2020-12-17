import React, {useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
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
  const [image, setImage] = useState("");

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

  /*
   Check to ensure fields are not empty, if all are entered, submit post request
  */
  const submitListing = (e) => {
    e.preventDefault();
    if(title.length < 1) {
      console.log("Title is empty");
      alert("Please enter a title.")
    } else if ( description.length < 1) {
      console.log("Description is empty");
      alert("Please enter a description.")
    } else if ( price.length < 1) {
      console.log("Price is not entered");
      alert("Please enter a price.")
    } else if ( category.length < 1) {
      console.log("Category is not selected");
      alert("Please select a category.")
    } else if ( condition.length < 1) {
      console.log("Condition is not selected");
      alert("Please select the condition.")
    } else if ( location.length < 1) {
      console.log("Location is not selected");
      alert("Please select a location.")
    } else if ( image.length < 1) {
      console.log("No image uploaded");
      alert("Please upload an image file.")
    } else { // no fields are empty -> append values and submit post request
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
              // headers: {'Content-Type': `multipart/form-data; boundary=${image.boundary}`},
              file: formData.get('image'),
              // thumbnail: formData.get('thumbnail'), // not currently implemented, but we would include thumbnail imgs here
            }
          })
          .then((response) => {
            console.log("post was made");
            alert(response.data.message);
            window.location.reload();
          });
    }
  };

  if (props.admin === "1") {
    return <Redirect to='/404' />
  } else {
      return (
        <div style={{ marginTop: "50px" }}>
          {/*<Container style={{ width: "800px", textAlign: "center"}}>*/}
          <Container xs={3} style={{textAlign: "center"}}>
            <h1 style={{marginTop: "-1rem", paddingBottom: "1rem"}}>List Your Goods!</h1>
            <br />

            <Form>
              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>Image</Form.Label>
                <Col xs={3} className="my-auto">
                <Form.File
                  id="exampleFormControlFile1"
                  name="image"
                    onChange={(e) => {
                      let filePath = e.target.value;

                      // Allowed file types
                      let allowedExtensions =
                          /(\.jpg|\.jpeg|\.png|\.gif)$/i;

                      // if the extension doesn't match, alert and dispose file
                      if (!allowedExtensions.exec(filePath)) {
                        alert('Invalid file type');
                        e.target.value = '';
                        setImage(
                            ""
                        );
                        return false;
                      }
                      else { // file is an image -> continue transformation to base64
                        console.log(e.target.files[0]); // picking our file
                        let reader = new FileReader(); // used to read our new file as data
                        reader.readAsDataURL(e.target.files[0]); // reading the file
                        reader.onloadend = function () { // after finished read, setImage()
                          setImage(
                              reader.result.replace(/^data:.+;base64,/, '') // update 'image' as a string of b64 data
                          );
                        };
                      }
                    }}
                />
                </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>Title</Form.Label>
                <Col xs={6} className="my-auto">
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
                </Col>
                </Form.Row>
              </Form.Group>


              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>Category</Form.Label>
                  <Col xs={3} className="my-auto">
                <Form.Control
                  as="select"
                  name="category"
                  value={category}
                  onChange={handleInputChange}
                >
                  <option value={""}>Choose</option>
                  <option value={"1"}>Books</option>
                  <option value={"2"}>Furniture</option>
                  <option value={"3"}>Electronics</option>
                  <option value={"4"}>Other</option>
                </Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>Price</Form.Label>
                <Col xs={3} className="my-auto">
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
                </Col>
              </Form.Row>
              </Form.Group>

              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>
                  Condition
                </Form.Label>
                  <Col xs={3} className="my-auto">
                    <InputGroup className="mb-2">
                  <Form.Control
                      as="select"
                      name="condition"
                      value={condition}
                      onChange={handleInputChange}
                  >
                    <option value={""}>Choose</option>
                    <option value={"1"}>Like New</option>
                    <option value={"2"}>Very Good</option>
                    <option value={"3"}>Good</option>
                    <option value={"4"}>Acceptable</option>
                  </Form.Control>
                    </InputGroup>
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>Transaction Location</Form.Label>
                  <Col xs={3} className="my-auto">
                    <InputGroup className="mb-2">
                  <Form.Control
                      as="select"
                      name="location"
                      value={location}
                      onChange={handleInputChange}
                  >
                    <option value={""}>Choose</option>
                    <option value={"Library"}>Library</option>
                    <option value={"The Village"}>The Village</option>
                    <option value={"C. Chavez"}>C. Chavez</option>
                    <option value={"Thornton Hall"}>Thornton Hall</option>
                  </Form.Control>
                    </InputGroup>
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group>
                <Form.Row>
                <Form.Label column="xs" xs={3} style={{textAlign: "end", paddingRight: "1rem"}}>Description</Form.Label>
                  <Col xs={6} className="my-auto">
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group>
              <Form.Row  style={{ marginTop: "2rem", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Col xs="auto" style={{paddingRight: "1rem"}}>
                  <Button
                    variant="secondary"
                    className="btn-lg"
                    type="submit"
                    href="/"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    className="btn-lg"
                    type="submit"
                    onClick={submitListing}
                  >
                    Submit
                  </Button>
                </Col>
              </Form.Row>
              </Form.Group>

            </Form>
          </Container>
        </div>
      );
  }
}