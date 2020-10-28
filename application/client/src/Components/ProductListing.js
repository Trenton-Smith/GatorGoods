import React, { useState } from "react";
import { Image, Container, Modal, Col, Row, Button, Form } from "react-bootstrap";
import "./ProductListing.css"

export default function ProductListing() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Container style={{margin:"5rem"}}>
                <Row>
                    <Col lg={6}>
                        <Image src="holder.js/100px160" roundedCircle />
                    </Col>
                    <Col lg={6}>
                        <h3>Mid Century Modern Mushroom Floor Lamp - from IKEA</h3>
                        <h2 className="price">$25</h2>
                        <Container className="container-description">
                            <p><i class="fas fa-history"></i> &nbsp;Condition: Very good</p>
                            <p><i class="fas fa-map-marker-alt"></i> &nbsp; Transaction location: Library, Building 1, Building 2</p>
                            <p><i class="fas fa-info-circle"></i> &nbsp; Details: - Basic Ikea lamp, black base and frosted shade. - Small dent in the base as pictured. Clean and works well.</p>
                            
                        </Container>
                        <Button variant="primary" size="lg" onClick={handleShow}><i class="far fa-comment-dots"></i> &nbsp; Contact seller</Button>{' '}
                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Contact seller</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="formProductName">
                                        <Form.Label>What are you interested in?</Form.Label>
                                        <Form.Control type="product name" placeholder="Enter the name of the product" />
                                    </Form.Group>
                                    <Form.Group controlId="formContact">
                                        <Form.Label>How do like to be reached out?</Form.Label>
                                        <Form.Control type="contact" placeholder="Enter your email or phone number" />
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
                <Row style={{margin:"1rem"}}>
                    <Col lg="auto">Seller: jelllycat10</Col>
                    <Col lg="auto">Posted: 2 hours ago</Col>
                    <Col lg="auto">Updated: 1 hour ago</Col>
                </Row>
                <Row style={{margin:"1rem"}}>
                    <Col lg="auto">Beware of scams and frauds!</Col>
                </Row>
            </Container>
        </div>
  );
}
