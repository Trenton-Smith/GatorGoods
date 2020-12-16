import React, {useEffect, useState} from "react";
import {Card, Col, Row, Button, Popover, Modal, Form, OverlayTrigger} from "react-bootstrap";
import "./ListingCard.css";
import axios from "axios";
// import { useHistory } from "react-router-dom"; // for same tab openings


/**
 * File name: ListingCard.js
 * Purpose: ListingCard is used to instantiate a product listing card for product_listing(s) from the database. It works
 *          by receiving the data passed as props, then parsing the fields from that data to render specific elements of
 *          each unique card. On click, any card on any view must be able to route to a productListing view with that
 *          card's specific data. This is handled by sending its data (as props again) through the history.push() method
 *          to the productlisting route (if using same tab), or by predeclaring the data through window.open() (if
 *          using a new tab). In addition, each listingCard must incorporate a direct access button to contact the
 *          owner of that listing during browsing. This is done by linking the message modal through a login check.
 * Authors: YG, Trenton, Joy
 * Notes: The modal used below is a copy of Message.js. Eventually that component will be imported into this file, but
 *        for now since there were issues transferring the state with that method, it remains as a built-in feature.
 */

export default function ListingCard(props) {

  // const history = useHistory(); // for sending and receiving data between views

  // for routing to a unique productListing view after onClick event for specific card
  function handleClick(e) {
    e.preventDefault()
    // history.push("/productlisting", {
    //   productListing: props
    // });
    window.open(`/productlisting`, "_blank");
    window.productlisting = props;
    window.newImage = img;
  }
  // console.log(props)

  /**
   * --- begin Logic for hover contact seller button---
   */
  const [buttonShow, setButtonShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onButton, setOnButton] = useState(false);

  /*
   Automatically detects if a user is logged in by way of a get request to the database on load. This is what we use to
   conditionally render features.
  */
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("/api/auth/authenticate").then(async (response) => {
      await setIsLoggedIn(response.data.loggedIn);
    });
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const route = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      setShow(true)
    }
  }
  /**
   * --- end Logic for hover 'contact seller' button---
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
  const [product, setProduct] = useState(props.product_id);
  const [seller, setSeller] = useState(props.user);
  const [title, setTitle] = useState(props.title);
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
    setProduct(props.product_id);
    setSeller(props.user);
  }, []);

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
    if(message.length < 1) {
      console.log("No message has been entered");
      alert("Please enter your message.")
    } else if (contact.length < 6) { // minimum length is either a phone number (10 digits) or email w/ "_@_.__" (6 chars)
      console.log("No contact information has been entered");
      alert("Please enter your contact information.\nIt should be either a 10 digit phone number, or valid email address")
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
  /**
   *
   */
  /*
   newImage and newImage2 are how we render either binary or b64 data received from our props, as images. We need to
   create state (below) and update the src of our <Card.Img> with the value of either of these on an error rendering.
   We only store images as binary (manual uploading into database through workbench) and b64 (through app createListing)
   so we do not need any further rendering options other than these two.
  */
  let newImage = new Buffer.from(props.image_blob.data).toString(); //renders base64 data
  let newImage2 = new Buffer.from(props.image_blob.data).toString("base64"); //renders binary data

  /*
   If we implement thumbnails, we will use these instead of the above values, as we will pull from the image_thumb col
   of our image table for the lower res image files on multi-card views (home, books, furniture... etc.) and save the
   full res images (image_blob col of Product_Listings) for individual productListing views.
  */
  // let newImage = new Buffer.from(props.image_thumb.data).toString();
  // let newImage2 = new Buffer.from(props.image_thumb.data).toString("base64");

  const [img, setImg] = useState(newImage2); // state for img (see above)
  // const [flag, setFlag] = useState(true); // state for flag - legacy implementation
  const [cond, setCond] = useState("");
  const [desc, setDesc] = useState("");
  /*
   This useEffect is for rendering images tailored to specific product_listings. For product_id's < 33, we render the
   binary data which we manually input into the database for initial testing; and thereafter, we set our image to render
   base64 data which is saved through the application's registered users.
  */
  useEffect(() => {
    if (props.product_id < 33) {
      setImg(newImage2);
    } else {
      setImg(newImage);
    }
    if (props.condition === "1") {
      setCond("Like New")
    } else if ( props.condition === "2") {
      setCond("Very Good")
    } else if ( props.condition === "3") {
      setCond("Good")
    } else if ( props.condition === "4") {
      setCond("Acceptable")
    }
    if (props.description.length > 90) {
      setDesc(props.description.substring(0,90) + "...")
    } else {
      setDesc(props.description)
    }
  }, [props, img, cond, desc]);


  return (
  <div>
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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



    <Card
      onClick={(e)=>{if(!onButton){handleClick(e)}}}
      onMouseEnter={()=>{setButtonShow(true)}}
      onMouseLeave={()=>{setButtonShow(false)}}
      className="listingcard"
      style={{ height: "30rem", width: "15rem" }}
    >
      {/*<Card.Img variant="top" src="holder.js/100px160" />*/  /*replaced with below, keeping for legacy reference*/}
      {buttonShow ? (
          isLoggedIn ? (
            <Col style={{alignItems: "end"}}>
            <Button onClick={route} onMouseEnter={()=>{setOnButton(true)}}
                    onMouseLeave={()=>{setOnButton(false)}}
                    style={{position: "absolute"}}>Contact Seller
            </Button>
            </Col>
          ) : (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Col style={{alignItems: "end"}}>
                <Button onClick={route} onMouseEnter={()=>{setOnButton(true)}}
                        onMouseLeave={()=>{setOnButton(false)}}
                        style={{position: "absolute"}}>Contact Seller
                </Button>
              </Col>
            </OverlayTrigger>
          )
      ) : (<span></span>)}
      <Card.Img variant="top"
                src={`data:image/jpeg;charset=utf-8;base64, ${img}`}
                // onError={(e)=>{if(flag){setFlag(false);setImg(newImage)}}}   /*keeping for reference*/
                alt="image not found"
                classname="img-thumbnail"
                style={{maxWidth: "15rem", maxHeight: "20rem", borderBottom: "solid", borderBottomColor: "#efefef",
                  borderWidth: "1px", marginBottom: "-10px"}}
                 />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          <Row className="price-condition">
            <Col style={{marginLeft: "-40px", marginRight: "-10px", paddingLeft: "0", paddingRight: "0"}}>${props.price}</Col>
            <Col style={{marginLeft: "-60px"}}> | Condition: {cond}</Col>
          </Row>
        </Card.Text>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
    </Card>
  </div>
  );
}

