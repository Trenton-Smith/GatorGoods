import React, { useState } from "react";
import {
  Image,
  Container,
  Modal,
  Col,
  Row,
  Button,
  Form, Card,
} from "react-bootstrap";
import "./ProductListing.css";

export default function ProductListing(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productListing, setProductListing] = useState(
    props.location.state.productListing
  );
  const newImage = new Buffer.from(props.location.state.productListing.image_blob.data).toString(
    "base64"
  );
  console.log(props.location.state.productListing);

  return (
    <div>
      <Container style={{ margin: "5rem" }}>
        <Row>
          <Col lg={6}>
            {/*<Image src="holder.js/100px160" roundedCircle />*/}
            <Image src={`data:image/jpeg;base64, ${newImage}`} alt="image not found" style={{ maxWidth: "450px", maxHeight: "450px" }} />
          </Col>
          <Col lg={6}>
            <h3>{productListing.title}</h3>
            <h2 className="price">${productListing.price}</h2>
            <Container className="container-description">
              <p>
                <i class="fas fa-history"></i> &nbsp; Condition:{" "}
                {productListing.condition}
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
