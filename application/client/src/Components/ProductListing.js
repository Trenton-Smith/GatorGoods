import React, { useEffect, useState } from "react";
import {
  Image,
  Container,
  Modal,
  Col,
  Row,
  Button,
  Form,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import "./ProductListing.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

/**
 * File name: ProductListing.js
 * Purpose: This is the resultant view after a user clicks on an individual product listing card on a view which homes
 *          multiple cards (home, books, furniture, etc.). It receives the data from that unique card as props, and then
 *          parses the values contained in props into elements of the product listing. Users who are registered and
 *          logged in may contact the listing user of a product listing from this view. *Note: This file has two working
 *          versions dependent on the chosen feature -> current implementation is with onCLick events triggering a new
 *          window load. The commented implementation is for triggering a same window load.
 * Authors: YG, Trenton (functions) | Joy (styling)
 * Notes: The modal used below is a copy of Message.js. Eventually that component will be imported into this file, but
 *        for now since there were issues transferring the state with that method, it remains as a built-in feature.
 */

export default function ProductListing(props) {
  const history = useHistory();

  // const [show, setShow] = useState(false); // state for displaying/hiding the "contact seller" modal
  // const handleClose = () => setShow(false); // hides modal (default)
  // const handleShow = () => setShow(true); // displays modal

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
    if (productListing.condition === "1") {
      setCondition(" Like New");
      // console.log(condition);
    } else if (productListing.condition === "2") {
      setCondition(" Very Good");
    } else if (productListing.condition === "3") {
      setCondition(" Good");
    } else if (productListing.condition === "4") {
      setCondition(" Acceptable");
    }
  }, [props, condition]);

  // const onContactSeller = () => {
  //   history.push("/message", {
  //     title: productListing.title,
  //     product_id: productListing.product_id,
  //     seller: productListing.user,
  //   });
  // };
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

  /**
   * ---BEGIN MODAL LOGIC---
   */
  const [show, setShow] = useState(false); // state for displaying/hiding the "contact seller" modal
  const handleClose = () => setShow(false); // hides modal (default)
  const handleShow = () => setShow(true); // displays modal

  /*
   State which auto loads the fields for the modal as well as the db values for uploading
  */
  const [product, setProduct] = useState(productListing.product_id);
  const [seller, setSeller] = useState(productListing.user);
  const [title, setTitle] = useState(productListing.title);
  const initialInputState = {
    message: "",
    contact: "",
  };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { message, contact } = eachEntry;
  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setProduct(productListing.product_id);
    setSeller(productListing.user);
  }, []);

  // state which is used to hide or display buttons for accessing features that require a user to be logged-in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*
   Automatically detects if a user is logged in by way of a get request to the database on load.
  */
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("/api/auth/authenticate").then(async (response) => {
      await setIsLoggedIn(response.data.loggedIn);
    });
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  /*
   If a user IS NOT logged in, they will be directed to log in before being able to access the message modal
  */
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Please Log In!</Popover.Title>
      <Popover.Content>
        Uh oh! You're not logged in! Please log in to continue!
      </Popover.Content>
    </Popover>
  );

  /*
   If a user IS logged in, they will be able to post messages to the database through this route
  */
  const handleSend = () => {
    console.log(product);
    if (message.length < 1) {
      console.log("No message has been entered");
      alert("Please enter your message.");
    } else if (contact.length < 6) {
      // minimum length is either a phone number (10 digits) or email w/ "_@_.__" (6 chars)
      console.log("No contact information has been entered");
      alert(
        "Please enter your contact information.\nIt should be either a 10 digit phone number, or valid email address"
      );
    } else {
      axios
        .post("/api/message/sendMessage", {
          title: title,
          message: message,
          contact: contact,
          product: product,
          seller: seller,
        })
        .then(() => {
          alert("Your message has been sent!");
          // console.log("message sent")
        });
      setShow(false);
    }
  };
  /**
   * ---END MODAL LOGIC---
   */

  return (
    <div>
      {/* CONTACT SELLER MODAL */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact the seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>What are you interested in?</Form.Label>
              <h2>{title}</h2>
            </Form.Group>
            <Form.Group controlId="formContact">
              <Form.Label>How would you like to be contacted?</Form.Label>
              <Form.Control
                type="contact"
                name="contact"
                placeholder="Enter your email or phone number"
                value={contact}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                name="message"
                type="message"
                value={message}
                onChange={handleInputChange}
                as="textarea"
                rows={4}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>

      {/* PRODUCT LISTING */}
      <Container style={{ margin: "5rem" }}>
        <Row>
          <Col lg={6}>
            <Image
              src={`data:image/jpeg;charset=utf-8;base64, ${window.opener.newImage}`}
              // onError={(e)=>{if(flag){setFlag(false);setImg(newImage)}}} // same window implementation
              alt="image not found"
              style={{ maxWidth: "450px", maxHeight: "450px" }}
            />
          </Col>
          <Col lg={6}>
            <h3>{productListing.title}</h3>
            <h2
              className="price"
              style={{
                marginTop: "1rem",
              }}
            >
              ${productListing.price}
            </h2>
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
            {props.admin !== "1" && <span>
            {isLoggedIn ? (
              <Button variant="primary" size="lg" onClick={handleShow}>
                <i class="far fa-comment-dots"></i> &nbsp; Contact seller
              </Button>
            ) : (
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
              >
                <Button variant="primary" size="lg">
                  <i class="far fa-comment-dots"></i> &nbsp;Contact seller
                </Button>
              </OverlayTrigger>
            )} </span>}
            <p
              style={{
                marginTop: "1rem",
                color: "grey",
                fontSize: "9pt",
              }}
            >
              Beware of scams and frauds.
            </p>
          </Col>
        </Row>
      </Container>
      {/* <Row style={{ margin: "1rem" }}>*/}
      {/*  <Col lg="auto">Seller: {productListing.user}</Col>*/}
      {/*  <Col lg="auto">Posted: 2 hours ago</Col>*/}
      {/*  <Col lg="auto">Updated: 1 hour ago</Col>*/}
      {/*</Row> */}
    </div>
  );
}
