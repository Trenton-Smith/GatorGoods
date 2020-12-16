import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Message(props) {
  const [show, setShow] = useState(false); // state for displaying/hiding the "contact seller" modal
  const handleClose = () => setShow(false); // hides modal (default)
  const handleShow = () => setShow(true); // displays modal
  const [product, setProduct] = useState(props.location.state.product_id);
  const [seller, setSeller] = useState(props.location.state.seller);
  const [title, setTitle] = useState(props.location.state.title);
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
    setShow(true);
    setProduct(props.location.state.product_id);
    setSeller(props.location.state.seller);
    // setTitle(props.location.state.title);
  }, []);

  const handleSend = () => {
    console.log(product);
    axios
      .post("/api/message/sendMessage", {
        message: message,
        contact: contact,
        product: product,
        seller: seller,
      })
      .then(() => {
        alert("successfully sent.");
      });
    setShow(false);
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Contact seller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>What are you interested in?</Form.Label>
            <h2>{title}</h2>
            {/* <Form.Control
              type="product name"
              placeholder="Enter the name of the product"
            /> */}
          </Form.Group>
          <Form.Group controlId="formContact">
            <Form.Label>How do like to be reached out?</Form.Label>
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
  );
}
