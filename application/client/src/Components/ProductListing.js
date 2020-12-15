import React, {useEffect, useState} from "react";
import {
  Image,
  Container,
  Modal,
  Col,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import "./ProductListing.css";


/**
 * File name: ProductListing.js
 * Purpose: This is the resultant view after a user clicks on an individual product listing card on a view which homes
 *          multiple cards (home, books, furniture, etc.). It receives the data from that unique card as props, and then
 *          parses the values contained in props into elements of the product listing. Users who are registered and
 *          logged in may contact the listing user of a product listing from this view. *Note: This file has two working
 *          versions dependent on the chosen feature -> current implementation is with onCLick events triggering a new
 *          window load. The commented implementation is for triggering a same window load.
 * Authors: YG, Trenton (functions) | Joy (styling)
 * Notes: Still needs to implement a proper modal with preloaded values, and messaging functionality.
 */

export default function ProductListing(props) {

  const [show, setShow] = useState(false); // state for displaying/hiding the "contact seller" modal
  const handleClose = () => setShow(false); // hides modal (default)
  const handleShow = () => setShow(true); // displays modal

  /**
   * ---BEGIN NEW WINDOW LOAD---
   */
  /*
   We only need to pull the initial data passed to the window as our state, as we are not performing any reloads or
   sorts on this view afterwards, and therefore have no need to change the intial state.
  */
  const [productListing, setProductListing] = useState(
      window.opener.productlisting
  );

  /*
   State and useEffect for converting condition values (small ints in db) to their corresponding strings -
   initial spaces are for formatting purposes
  */
  const [condition, setCondition] = useState("");
  useEffect(() => {
    console.log(productListing.condition);
    if(productListing.condition === '1'){
      setCondition(" Like New");
      // console.log(condition);
    }else if (productListing.condition === '2'){
      setCondition(" Very Good")
    }else if (productListing.condition === '3'){
      setCondition(" Good")
    }else if (productListing.condition === '4'){
      setCondition(" Acceptable")
    }
  }, [props, condition]);
  /**
   * ---END NEW WINDOW LOAD---
   */


  /**
   * ---BEGIN SAME WINDOW LOAD---
   */
  /*
   Allows us to refer to the data passed through props as simply our productListing.
   We do not implement setProductListing (updates state) currently as there is no current need to update its state once
   the user is already on this page; however, it will remain in case there is a future need.
  */
  // const [productListing, setProductListing] = useState(
  //   props.location.state.productListing
  // );

  /*
   newImage and newImage2 are how we render either binary or b64 data received from our props, as images. We need to
   create state (below) and update the src of our <Image> with the value of either of these on an error rendering.
   We only store images as binary (manual uploading into database through workbench) and b64 (through app createListing)
   so we do not need any further rendering options other than these two.
  */
  // const newImage = new Buffer.from(props.location.state.productListing.image_blob.data).toString();
  // const newImage2 = new Buffer.from(props.location.state.productListing.image_blob.data).toString("base64");

  // const [img, setImg] = useState(newImage2); // state for img (see above)
  // const [flag, setFlag] = useState(true); // state for flag - HAVE to update state or else the app will crash..
  //                                                   // ..due to excessive re-rendering

  // console.log(props.location.state.productListing);
  /**
   * ---END SAME WINDOW LOAD---
   */

  return (
    <div>
      <Container style={{ margin: "5rem" }}>
        <Row>
          <Col lg={6}>
            {/*<Image src="holder.js/100px160" roundedCircle />*/}
            <Image src={`data:image/jpeg;charset=utf-8;base64, ${window.opener.newImage}`}
                   // onError={(e)=>{if(flag){setFlag(false);setImg(newImage)}}} // same window implementation
                   alt="image not found"
                   style={{maxWidth: "450px", maxHeight: "450px"}}/>
          </Col>
          <Col lg={6}>
            <h3>{productListing.title}</h3>
            <h2 className="price">${productListing.price}</h2>
            <Container className="container-description">
              <p>
                <i class="fas fa-history"></i> &nbsp; Condition:{condition}
              </p>
              <p>
                <i class="fas fa-map-marker-alt"></i> &nbsp; Transaction
                location: {productListing.location}
              </p>
              <p>
                <i class="fas fa-info-circle"></i> &nbsp; Details:{" "}
                {productListing.description}
              </p>
            </Container>
            <Button variant="primary" size="lg" onClick={handleShow}>
              <i class="far fa-comment-dots"></i> &nbsp; Contact seller
            </Button>{" "}

            {/*CONTACT  /  MESSAGE MODAL*/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Contact seller</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formProductName">
                    <Form.Label>What are you interested in?</Form.Label>
                    <Form.Control
                      type="product name"
                      placeholder="Enter the name of the product"
                    />
                  </Form.Group>
                  <Form.Group controlId="formContact">
                    <Form.Label>How do like to be reached out?</Form.Label>
                    <Form.Control
                      type="contact"
                      placeholder="Enter your email or phone number"
                    />
                  </Form.Group>
                  <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">Send Message</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
      <Container className="container-footer">
        <Row style={{ margin: "1rem" }}>
          <Col lg="auto">Seller: jelllycat10</Col>
          <Col lg="auto">Posted: 2 hours ago</Col>
          <Col lg="auto">Updated: 1 hour ago</Col>
        </Row>
        <Row style={{ margin: "1rem" }}>
          <Col lg="auto">Beware of scams and frauds!</Col>
        </Row>
      </Container>
    </div>
  );
}
